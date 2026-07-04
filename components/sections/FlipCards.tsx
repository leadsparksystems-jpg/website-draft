"use client"

import { useState, useEffect, useRef } from "react"
import { CtaButton } from "@/components/ui/cta-button"

function FlipCard({
  variant,
  axisClass,
  front,
  back,
  isOpen,
  onToggle,
}: {
  variant: "dark" | "cream"
  axisClass?: string
  front: React.ReactNode
  back: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`flip-card flip-card--${variant}${axisClass ? ` ${axisClass}` : ""}${isOpen ? " is-open" : ""}`}
      onClick={onToggle}
      onTouchEnd={(e) => { e.preventDefault(); onToggle() }}
    >
      <div className="flip-card__inner">
        <span className="flip-card__reprompt" aria-hidden="true">Tap to open</span>
        <div className="flip-card__face flip-card__front">{front}</div>
        <div className="flip-card__face flip-card__back">{back}</div>
      </div>
    </div>
  )
}

export function FlipCards() {
  const [openCard, setOpenCard] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setOpenCard(null) },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggle = (i: number) => setOpenCard(prev => prev === i ? null : i)

  return (
    <section className="universal-section">
      <div className="main-grid main-grid--unlocked flip-section-grid">

        <div className="bento hug-bento case-study">
          <div className="hug-bento-content-wrap">
            <div className="content-layout-wrap">
              <div className="text-wrap">
                <h2 className="section-heading">
                  arctic wellness: from invisible to Ireland&apos;s <span className="brand-green">largest</span> wellness installation contractor
                </h2>
                <p className="secondary-heading">Client success with websites that generate a consistent flow of jobs.</p>
              </div>
              <div className="button-wrap button-wrap--right button-wrap--pair">
                <a className="page-link" href="#story">
                  <span className="page-link__label">READ FULL STORY</span>
                  <span className="page-link__arrow">
                    <svg viewBox="0 0 24 16" fill="none" aria-hidden="true" focusable="false">
                      <path d="M2 8h18M15.5 2.5 21 8l-5.5 5.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
                <CtaButton label="YOU CAN DO THE SAME" />
              </div>
            </div>
          </div>
        </div>

        <div className="bento fill-bento testimonial">
          <div className="fill-bento-wrap-small">
            <div className="text-wrap text-wrap--centered testimonial__inner">
              <p className="testimonial__quote">&ldquo;Since we started working with Sylvan our enquiries have been non stop, we have been able to focus on scaling while having a predictable flow of customers&rdquo;</p>
              <p className="secondary-heading">Jonathan Chadwick, Founder.</p>
            </div>
          </div>
        </div>

        <div className="flip-grid" ref={gridRef}>
          <FlipCard
            variant="dark"
            isOpen={openCard === 0}
            onToggle={() => toggle(0)}
            front={
              <>
                <div className="fill-bento-wrap-small">
                  <div className="text-wrap">
                    <p className="flip-card__stat light-brand">€10k-30k</p>
                    <p className="card-heading cream">Deals, consistently generated.</p>
                  </div>
                </div>
                <div className="flip-prompt-wrap">
                  <p className="flip-card__hint">(Flip to learn more)</p>
                </div>
              </>
            }
            back={
              <div className="fill-bento-wrap-small">
                <div className="flip-card__content-wrap">
                  <span className="vertical-line" aria-hidden="true" />
                  <div className="text-wrap text-wrap--flush">
                    <p className="paragraph paragraph--on-dark">The website communicated the premium nature of the Arctic Wellness Brand through it&apos;s design, and brought in high end buyers - ready to invest.</p>
                  </div>
                </div>
              </div>
            }
          />

          <FlipCard
            variant="cream"
            axisClass="flip-card--x"
            isOpen={openCard === 1}
            onToggle={() => toggle(1)}
            front={
              <>
                <div className="fill-bento-wrap-small">
                  <div className="text-wrap">
                    <p className="flip-card__stat brand-green">Over 80%</p>
                    <p className="card-heading">of enquiries are qualified (ready to buy)</p>
                  </div>
                </div>
                <div className="flip-prompt-wrap">
                  <p className="flip-card__hint flip-card__hint--dark">(Flip to learn more)</p>
                </div>
              </>
            }
            back={
              <div className="fill-bento-wrap-small">
                <div className="flip-card__content-wrap">
                  <span className="vertical-line vertical-line--dark" aria-hidden="true" />
                  <div className="text-wrap text-wrap--flush">
                    <p className="paragraph">Even their referrals look them up before deciding. The site shows exactly who they are and why they&apos;re the right call so the leads they already had convert better too.</p>
                    <p className="paragraph">Our search engine optimisation (SEO) strategies led to the most qualified high intent buyers finding them.</p>
                  </div>
                </div>
              </div>
            }
          />
        </div>

      </div>
    </section>
  )
}
