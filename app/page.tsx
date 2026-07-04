import { Hero } from "@/components/sections/Hero"
import { Problem } from "@/components/sections/Problem"
import { AuditCTA } from "@/components/sections/AuditCTA"
import { FlipCards } from "@/components/sections/FlipCards"

export default function Home() {
  return (
    <main className="page">
      <Hero />
      <Problem />
      <AuditCTA />
      <FlipCards />
    </main>
  )
}
