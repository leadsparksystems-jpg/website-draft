import { CtaButton } from "@/components/ui/cta-button"

const cards = [
  { num: "01", heading: "Someone searches for your trade.", body: "80% of customers looking for a service search online first.", variant: "fill-bento", icon: "/assets/images/Binochluars.png" },
  { num: "02", heading: "You don't show up. Your competitor does.", body: "Your competitor who does a worse job than you is recommended.", variant: "fill-bento", icon: "/assets/images/Eye.png" },
  { num: "03", heading: "They get the call. You never knew it was going.", body: "Because they are better? No. They have the right customer acquisition system in place.", variant: "hug-bento", icon: "/assets/images/Phone.png" },
  { num: "04", heading: "For those who do find you...", body: "Half slip away — no system to follow up, so they go with the next name on the list.", variant: "fill-bento", icon: "/assets/images/Falling Person.png" },
]

export function Problem() {
  return (
    <section className="universal-section">
      <div className="main-grid main-grid--unlocked problem-grid">

        <div className="bento hug-bento problem-intro">
          <div className="hug-bento-content-wrap">
            <div className="content-layout-wrap content-layout-wrap--centered">
              <div className="text-wrap text-wrap--centered problem-intro__text">
                <h2 className="section-heading">
                  Right now, someone&apos;s handing a job to a business with <span className="ember">worse</span> work than you.
                </h2>
                <p className="secondary-heading">Why Irish trade businesses and contractors lose jobs because of their visibility online.</p>
              </div>
              <div className="button-wrap button-wrap--center">
                <CtaButton label="SEE IF THIS IS YOU" />
              </div>
            </div>
          </div>
        </div>

        {cards.map((card, i) => (
          <div key={i} className={`bento ${card.variant} problem-card problem-card--${i + 1}`}>
            <div className="fill-bento-wrap-small">
              <div className="stacked-card-wrap">
                <div className="card-icon-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="card-icon" src={card.icon} alt="" aria-hidden="true" />
                </div>
                <div className="text-wrap">
                  <p className="card-heading">{card.num}: {card.heading}</p>
                  <p className="paragraph">{card.body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
