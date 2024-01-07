import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google"

export const sourceSerif = Source_Serif_4({
  preload: true,
  weight: "variable",
  subsets: ["latin-ext", "cyrillic", "cyrillic-ext", "latin", "vietnamese"],
})

export const IBMPlexSans = IBM_Plex_Sans({
  weight: "400",
  subsets: ["latin"],
})
