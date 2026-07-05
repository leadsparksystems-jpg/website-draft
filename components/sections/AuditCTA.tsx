import { CtaButton } from "@/components/ui/cta-button"

export function AuditCTA() {
  return (
    <section className="universal-section" id="audit">
      <div className="main-grid audit-grid">
        <div className="bento fill-bento fill-bento--green audit-card">
          <div className="fill-bento-wrap-small">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="audit-spark" src="/assets/icons/green spark.png" alt="" aria-hidden="true" />
            <div className="cta-card-wrap">
              <div className="horizontal-text-wrap">
                <h2 className="section-heading section-heading--on-dark">
                  Get a <span className="light-brand">Free</span> <span className="cream">Personalised</span> Website &amp; Visibility Audit — to see how you are showing up online
                </h2>
                <div className="hz-fill-wrap audit-bullets">
                  <span className="vertical-line" aria-hidden="true" />
                  <ul className="text-wrap bullet-list">
                    <li>Website analysis — where you could be losing sales.</li>
                    <li>Visibility analysis: what your customers are searching for, where and how you show up vs competitors.</li>
                    <li>Actionable insights, quick fixes, and free resources to help you get found.</li>
                  </ul>
                </div>
              </div>
              <div className="button-wrap button-wrap--right">
                <CtaButton label="GET FOUND (IT'S FREE)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
