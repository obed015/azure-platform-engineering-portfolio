"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "app" | "observability" | "docker" | "azure" | "cicd" | "keyvault";

const tabs: { id: Tab; label: string }[] = [
  { id: "app", label: "APP CODE" },
  { id: "observability", label: "OBSERVABILITY" },
  { id: "docker", label: "DOCKER" },
  { id: "azure", label: "AZURE CLI" },
  { id: "cicd", label: "CI/CD" },
  { id: "keyvault", label: "KEY VAULT" },
];

const code = {
  appMain: `import os

from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from azure.monitor.opentelemetry import configure_azure_monitor

from app.config import Settings
from app.db.init_db import init_db
from app.services.weather_service import WeatherService
from app.services.favourites_service import FavouritesService

connection_string = os.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING")

if connection_string:
    configure_azure_monitor(connection_string=connection_string)

app = FastAPI(title="Weather Tracker Azure")

app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

weather_service = WeatherService()
favourites_service = FavouritesService()

@app.on_event("startup")
async def startup_event():
    Settings.validate()
    init_db()

@app.get("/health")
async def health():
    return {"status": "ok", "environment": Settings.APP_ENV}`,

  weatherService: `class WeatherService:
    BASE_URL = "https://api.weatherapi.com/v1/forecast.json"

    async def get_weather(self, city: str, days: int = 3) -> dict:
        params = {
            "key": Settings.WEATHER_API_KEY,
            "q": city,
            "days": days,
            "aqi": "no",
            "alerts": "no",
        }

        start_time = time.perf_counter()
        log_info("Weather request started", city=city, days=days)

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.get(self.BASE_URL, params=params)
                response.raise_for_status()

            latency = round(time.perf_counter() - start_time, 2)
            log_info(
                "Weather request successful",
                city=city,
                days=days,
                status_code=response.status_code,
                latency_seconds=latency,
            )
            return response.json()

        except httpx.HTTPStatusError as ex:
            latency = round(time.perf_counter() - start_time, 2)
            log_error(
                "Weather API HTTP error",
                city=city,
                days=days,
                status_code=ex.response.status_code,
                latency_seconds=latency,
                error=str(ex),
            )
            raise`,

  config: `class Settings:
    WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "")
    APP_ENV = os.getenv("APP_ENV", "local")
    DB_PATH = os.getenv("DB_PATH", "weather.db")

    @classmethod
    def validate(cls):
        if not cls.WEATHER_API_KEY:
            raise ValueError(
                "WEATHER_API_KEY environment variable is required"
            )`,

  logging: `logger = logging.getLogger("weather-tracker")
logger.setLevel(logging.INFO)

handler = logging.StreamHandler()
formatter = logging.Formatter(
    "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)

handler.setFormatter(formatter)

if not logger.handlers:
    logger.addHandler(handler)

def _format_message(message: str, **kwargs: Any) -> str:
    if not kwargs:
        return message
    return f"{message} | {json.dumps(kwargs, default=str)}"

def log_info(message: str, **kwargs: Any):
    logger.info(_format_message(message, **kwargs))

def log_error(message: str, **kwargs: Any):
    logger.error(_format_message(message, **kwargs))`,

  kql: `requests
| order by timestamp desc
| take 20

traces
| where message contains "Weather request"
| order by timestamp desc
| take 20

traces
| where severityLevel >= 3
| where message contains "Weather API HTTP error"
| order by timestamp desc
| take 10`,

  alert: `AI_ID=$(az monitor app-insights component show \
  --app weather-tracker-ai \
  --resource-group $RG \
  --query id \
  --output tsv)

az monitor scheduled-query create \
  --name "alert-weather-api-errors" \
  --resource-group $RG \
  --scopes $AI_ID \
  --description "Alert when Weather Tracker logs Weather API HTTP errors" \
  --condition "count 'WeatherApiErrors' > 0" \
  --condition-query WeatherApiErrors="traces | where severityLevel >= 3 | where message contains 'Weather API HTTP error'" \
  --evaluation-frequency 5m \
  --window-size 5m \
  --severity 2`,

  dockerfile: `FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV APP_ENV=container
ENV APP_PORT=8000
ENV DB_PATH=/app/weather.db

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

CMD ["gunicorn", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000", "app.main:app"]`,

  dockerIgnore: `.venv
.git
.env
.env.save
*.db
*.sqlite3
app.zip
__pycache__
*.pyc
.pytest_cache
.vscode`,

  dockerRun: `docker build -t weather-tracker:local .

docker run --rm -p 8080:8000 \
  --env-file .env \
  -e APP_ENV=container \
  weather-tracker:local

curl -i http://127.0.0.1:8080/health`,

  acr: `ACR_NAME=acrweather17789

az acr create \
  --resource-group $RG \
  --name $ACR_NAME \
  --sku Basic \
  --location ukwest

ACR_LOGIN=$(az acr show \
  --name $ACR_NAME \
  --resource-group $RG \
  --query loginServer \
  --output tsv)

az acr login --name $ACR_NAME

docker tag weather-tracker:local \
  $ACR_LOGIN/weather-tracker:v1

docker push $ACR_LOGIN/weather-tracker:v1`,

  aci: `az container create \
  --resource-group $RG \
  --name weather-tracker-aci \
  --image $ACR_LOGIN/weather-tracker:v1 \
  --os-type Linux \
  --cpu 1 \
  --memory 1 \
  --registry-login-server $ACR_LOGIN \
  --dns-name-label weathertracker$RANDOM \
  --ports 8000 \
  --environment-variables \
      WEATHER_API_KEY=$WEATHER_API_KEY \
      APP_ENV=azure-container \
      DB_PATH=/app/weather.db`,

  containerApps: `az containerapp create \
  --name weather-tracker-ca \
  --resource-group $RG \
  --environment $ENV_NAME \
  --image $ACR_LOGIN/weather-tracker:v1 \
  --registry-server $ACR_LOGIN \
  --target-port 8000 \
  --ingress external \
  --cpu 0.5 \
  --memory 1.0Gi \
  --min-replicas 0 \
  --max-replicas 2 \
  --env-vars \
      WEATHER_API_KEY=$WEATHER_API_KEY \
      APP_ENV=azure-container-apps \
      DB_PATH=/app/weather.db`,

  cicd: `name: Build and Deploy to Azure Container Apps

on:
  push:
    branches:
      - main

env:
  IMAGE_NAME: weather-tracker

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Login to Azure
      uses: azure/login@v2
      with:
        creds: \${{ secrets.AZURE_CREDENTIALS }}

    - name: Login to Azure Container Registry
      run: |
        docker login \${{ secrets.ACR_LOGIN_SERVER }} \
          -u \${{ secrets.ACR_USERNAME }} \
          -p \${{ secrets.ACR_PASSWORD }}

    - name: Build Docker image
      run: |
        docker build \
          -t \${{ secrets.ACR_LOGIN_SERVER }}/weather-tracker:latest .

    - name: Push Docker image
      run: |
        docker push \
          \${{ secrets.ACR_LOGIN_SERVER }}/weather-tracker:latest

    - name: Update Container App
      run: |
        az containerapp update \
          --name weather-tracker-ca \
          --resource-group rg-weather-tracker-dev-ukwest \
          --image \${{ secrets.ACR_LOGIN_SERVER }}/weather-tracker:latest`,

  keyvault: `KV_NAME=kv-weather-2969

az keyvault create \
  --name $KV_NAME \
  --resource-group $RG \
  --location ukwest \
  --enable-rbac-authorization true

az keyvault secret set \
  --vault-name $KV_NAME \
  --name WEATHER-API-KEY \
  --value "$WEATHER_API_KEY"`,

  identity: `az containerapp identity assign \
  --name weather-tracker-ca \
  --resource-group $RG \
  --system-assigned

PRINCIPAL_ID=$(az containerapp identity show \
  --name weather-tracker-ca \
  --resource-group $RG \
  --query principalId \
  --output tsv)

az role assignment create \
  --assignee-object-id $PRINCIPAL_ID \
  --assignee-principal-type ServicePrincipal \
  --role "Key Vault Secrets User" \
  --scope $KV_ID`,

  kvReference: `SECRET_URI=$(az keyvault secret show \
  --vault-name $KV_NAME \
  --name WEATHER-API-KEY \
  --query id \
  --output tsv)

az containerapp secret set \
  --name weather-tracker-ca \
  --resource-group $RG \
  --secrets weather-api-key=keyvaultref:$SECRET_URI,identityref:system

az containerapp update \
  --name weather-tracker-ca \
  --resource-group $RG \
  --set-env-vars WEATHER_API_KEY=secretref:weather-api-key`,
};

function CodeBlock({ label, children }: { label: string; children: string }) {
  return (
    <div className="weather-code-block">
      <div className="weather-code-label">{label}</div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

export function WeatherDeepDive() {
  const [activeTab, setActiveTab] = useState<Tab>("app");

  return (
    <main className="weather-deep" id="top">
      <header className="weather-deep-topbar">
        <Link href="/projects/weather-tracker">← PROJECT OVERVIEW</Link>
        <span>ENGINEERING DEEP DIVE / WEATHER TRACKER</span>
        <a
          href="https://github.com/obed015/weather-tracker-azure"
          target="_blank"
          rel="noreferrer"
        >
          SOURCE ↗
        </a>
      </header>

      <section className="weather-deep-hero">
        <div>
          <span>REAL FASTAPI · DOCKER · AZURE CLI · KQL · CI/CD · KEY VAULT</span>
          <h1>
            IMPLEMENTATION
            <br />
            <em>BEHIND THE PLATFORM.</em>
          </h1>
          <p>
            The real application code, observability queries, Docker runtime,
            Azure deployment commands, GitHub Actions workflow, and Key Vault
            integration used by the live Weather Tracker.
          </p>
        </div>

        <div className="weather-deep-summary">
          <div><span>APPLICATION</span><strong>FastAPI + Jinja2 + HTTPX</strong></div>
          <div><span>RUNTIME</span><strong>Docker → ACR → Container Apps</strong></div>
          <div><span>MONITORING</span><strong>Application Insights + Azure Monitor</strong></div>
          <div><span>SECURITY</span><strong>Key Vault + Managed Identity</strong></div>
        </div>
      </section>

      <section className="weather-deep-workbench">
        <div className="weather-tabbar" role="tablist">
          {tabs.map((tab, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? "active" : ""}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="weather-tab-panel">
          {activeTab === "app" && (
            <>
              <div className="weather-deep-intro">
                <span>01 / APPLICATION</span>
                <h2>FASTAPI APPLICATION + RUNTIME CONFIGURATION.</h2>
              </div>
              <CodeBlock label="app/main.py">{code.appMain}</CodeBlock>
              <CodeBlock label="app/services/weather_service.py">{code.weatherService}</CodeBlock>
              <CodeBlock label="app/config.py">{code.config}</CodeBlock>
            </>
          )}

          {activeTab === "observability" && (
            <>
              <div className="weather-deep-intro">
                <span>02 / OBSERVABILITY</span>
                <h2>STRUCTURED LOGGING + KQL + ALERTING.</h2>
              </div>
              <CodeBlock label="app/services/logging_service.py">{code.logging}</CodeBlock>
              <CodeBlock label="Application Insights KQL">{code.kql}</CodeBlock>
              <CodeBlock label="Azure Monitor scheduled-query alert">{code.alert}</CodeBlock>
            </>
          )}

          {activeTab === "docker" && (
            <>
              <div className="weather-deep-intro">
                <span>03 / DOCKER</span>
                <h2>PORTABLE PRODUCTION-STYLE RUNTIME.</h2>
              </div>
              <CodeBlock label="Dockerfile">{code.dockerfile}</CodeBlock>
              <CodeBlock label=".dockerignore">{code.dockerIgnore}</CodeBlock>
              <CodeBlock label="Local validation">{code.dockerRun}</CodeBlock>
            </>
          )}

          {activeTab === "azure" && (
            <>
              <div className="weather-deep-intro">
                <span>04 / AZURE CLI</span>
                <h2>REGISTRY → VALIDATION → CONTAINER APPS.</h2>
              </div>
              <CodeBlock label="Azure Container Registry">{code.acr}</CodeBlock>
              <CodeBlock label="Azure Container Instances">{code.aci}</CodeBlock>
              <CodeBlock label="Azure Container Apps">{code.containerApps}</CodeBlock>
            </>
          )}

          {activeTab === "cicd" && (
            <>
              <div className="weather-deep-intro">
                <span>05 / CI/CD</span>
                <h2>BUILD, PUSH, DEPLOY ON EVERY MAIN-BRANCH CHANGE.</h2>
              </div>
              <CodeBlock label=".github/workflows/deploy.yml">{code.cicd}</CodeBlock>
              <div className="weather-deep-note">
                <span>REPOSITORY SECRETS</span>
                <p>
                  AZURE_CREDENTIALS, ACR_LOGIN_SERVER, ACR_USERNAME, and
                  ACR_PASSWORD are stored in GitHub repository secrets rather
                  than committed to source control.
                </p>
              </div>
            </>
          )}

          {activeTab === "keyvault" && (
            <>
              <div className="weather-deep-intro">
                <span>06 / KEY VAULT</span>
                <h2>REMOVE PLAINTEXT API-KEY HANDLING FROM THE RUNTIME.</h2>
              </div>
              <CodeBlock label="Create vault + store secret">{code.keyvault}</CodeBlock>
              <CodeBlock label="Managed identity + RBAC">{code.identity}</CodeBlock>
              <CodeBlock label="Container Apps Key Vault reference">{code.kvReference}</CodeBlock>
            </>
          )}
        </div>
      </section>

      <section className="weather-deep-footer-cta">
        <div>
          <span>LIVE IMPLEMENTATION</span>
          <h2>CODE, CONTAINER, CLOUD RUNTIME.</h2>
        </div>
        <div>
          <a
            href="https://weather-tracker-ca.purpleglacier-4ce16430.ukwest.azurecontainerapps.io"
            target="_blank"
            rel="noreferrer"
          >
            OPEN LIVE APP ↗
          </a>
          <a
            href="https://github.com/obed015/weather-tracker-azure"
            target="_blank"
            rel="noreferrer"
          >
            OPEN REPOSITORY ↗
          </a>
        </div>
      </section>
    </main>
  );
}
