import { ClerkProvider } from "@clerk/nextjs"

import { ThemeProvider } from "@/components/theme-provider"

import { PHProvider } from "./PHProvider"

export async function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProvider>
        <PHProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </PHProvider>
      </ClerkProvider>
    </>
  )
}
