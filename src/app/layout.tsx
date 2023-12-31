import type { Metadata } from "next"
import { IBMPlexSans } from "@/fonts"
import { AxiomWebVitals } from "next-axiom"

import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/app/providers"

import "./globals.css"

import { Suspense } from "react"

import { PostHogPageview } from "./PHProvider"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <body className={IBMPlexSans.className}>
        <div className="antialiased" vaul-drawer-wrapper="">
          <Providers>
            {props.children}
            {props.modal}
          </Providers>
        </div>
        <Toaster />
        <AxiomWebVitals />
      </body>
    </html>
  )
}
