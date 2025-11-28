"use client"

import { GreenTheme } from "@/components/green-theme"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

export default function LandingPage() {
  return (
    <GreenTheme>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-pretty text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Orchestrate Solar, Wind, Battery, and Grid as One
            </h1>
            <p className="mt-4 max-w-prose text-foreground/80 leading-relaxed">
              A campus-scale, software-first orchestration layer that forecasts generation and demand, optimizes
              charge/discharge, and minimizes cost and emissions—built with an accessible, green-forward UI.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/dashboard"
                className="rounded-md bg-[var(--primary)] px-4 py-2 text-[var(--primary-foreground)]"
              >
                Open Dashboard
              </Link>
              <Link href="/" className="rounded-md border border-foreground/10 px-4 py-2 text-foreground">
                Home
              </Link>
            </div>
          </div>
          <div className="mt-8 w-full max-w-md md:mt-0">
            <div className="rounded-xl border border-foreground/10 bg-[var(--card)] p-5">
              <h2 className="text-lg font-semibold text-foreground">Highlights</h2>
              <ul className="mt-3 list-disc pl-5 text-foreground/80">
                <li>Short-term weather-aware dispatch strategy</li>
                <li>Battery peak shaving + SoC target</li>
                <li>Alerts and CSV reporting</li>
                <li>Mobile-first, accessible design</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </GreenTheme>
  )
}
