export default function Home() {
  return (
    <main className="platform-shell">
      <section className="foundation-screen">
        <div className="foundation-topbar">
          <span>OBED://CLOUD_PLATFORM</span>
          <span className="status">
            <span className="status-dot" />
            SYSTEM ONLINE
          </span>
        </div>

        <div className="foundation-content">
          <p className="eyebrow">CLOUD_PLATFORM_ENGINEER</p>

          <h1>
            OBED
            <br />
            OWUSU
          </h1>

          <div className="statement">
            <span>BUILD.</span>
            <span>SECURE.</span>
            <span>AUTOMATE.</span>
            <span>OPERATE.</span>
          </div>

          <p className="description">
            Building secure, automated and observable Azure platforms across
            infrastructure, identity, security, integration and endpoint
            management.
          </p>
        </div>

        <div className="foundation-footer">
          <span>AZURE</span>
          <span>ENTRA ID</span>
          <span>TERRAFORM</span>
          <span>POWERSHELL</span>
          <span>INTUNE</span>
          <span>MICROSOFT GRAPH</span>
        </div>
      </section>
    </main>
  );
}