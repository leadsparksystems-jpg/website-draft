import type { Metadata } from "next"
import { Bricolage_Grotesque, DM_Mono } from "next/font/google"
import "./globals.css"
import "../css/home.css"

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
})

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "LeadSpark — Websites for Irish Trades Businesses & Contractors",
  description: "Websites for Irish trades businesses and contractors that get consistent booked jobs. End the feast or famine cycle.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
