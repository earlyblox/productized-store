import { PrismaClient } from "@prisma/client"

export const db = new PrismaClient({
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],

  errorFormat: process.env.NODE_ENV === "development" ? "pretty" : "colorless",
})

db.$on("warn", (e) => {
  console.log(e)
})

db.$on("info", (e) => {
  console.log(e)
})

db.$on("error", (e) => {
  console.log(e)
})
