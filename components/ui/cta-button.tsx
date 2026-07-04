import { cn } from "@/lib/utils"

interface CtaButtonProps {
  href?: string
  label: string
  className?: string
}

export function CtaButton({ href = "#audit", label, className }: CtaButtonProps) {
  return (
    <a className={cn("cta-button", className)} href={href}>
      <span className="cta-button__label">{label}</span>
      <span className="cta-button__arrow">
        <svg viewBox="0 0 24 16" fill="none" aria-hidden="true" focusable="false">
          <path d="M2 8h18M15.5 2.5 21 8l-5.5 5.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  )
}
