import { ThemeToggle } from "@/components/theme-toggle"
import { DiscoverPage } from "@/app/discover-page"

import { Footer } from "./footer"
import { Header } from "./header"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <DiscoverPage />
      <Footer />
    </main>
  )
}
