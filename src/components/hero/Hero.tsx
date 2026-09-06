const technologies = [
  "AZURE",
  "ENTRA ID",
  "TERRAFORM",
  "POWERSHELL",
  "INTUNE",
  "MICROSOFT GRAPH",
];

export function Hero() {
  return (
    <section className="foundation-screen">
      <div className="foundation-content">
        <p className="eyebrow">
          CLOUD PLATFORM ENGINEER
        </p>

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
          Building secure, automated and observable Azure
          platforms across infrastructure, identity,
          security, integration and endpoint management.
        </p>
      </div>

      <div className="foundation-footer">
        {technologies.map((technology) => (
          <span key={technology}>
            {technology}
          </span>
        ))}
      </div>
    </section>
  );
}