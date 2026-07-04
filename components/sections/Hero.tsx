import { CtaButton } from "@/components/ui/cta-button"

export function Hero() {
  return (
    <section className="hero-section">
      <div className="main-grid main-grid--locked hero-grid">

        <div className="bento fill-bento hero-logo">
          <div className="logo-banner-wrap">
            <span className="logo-banner__text">LEADSPARK</span>
          </div>
        </div>

        <div className="bento hug-bento hero-content">
          <div className="hero-content-wrap">
            <div className="content-layout-wrap">
              <div className="text-wrap text-wrap--flush">
                <p className="hero-heading"><span className="ember">END</span> the feast or<br />famine cycle</p>
                <h1 className="secondary-heading secondary-heading--muted">
                  Websites for Irish Trades Businesses &amp; Contractors<br />
                  That Get Consistent Booked Jobs.
                </h1>
              </div>
            </div>
            <div className="content-layout-wrap">
              <div className="text-wrap">
                <p className="paragraph paragraph--block">
                  We build the system that helps keep your job book full so you can quote
                  with confidence, choose your customers, and stop living by the phone.
                </p>
              </div>
              <div className="button-wrap button-wrap--right">
                <CtaButton label="GET A QUOTE" />
              </div>
            </div>
          </div>
        </div>

        <div className="bento fill-bento hero-empty" />

        <div className="bento fill-bento hero-stat">
          <div className="fill-bento-wrap-small">
            <div className="center-content-wrap">
              <div className="text-wrap text-wrap--centered stat">
                <p className="stat__label">Leads Worth</p>
                <p className="stat__value">€10k-€30k</p>
                <p className="stat__label">Consistently Generated For Clients</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
