import { execSync } from "child_process"
import os from "os"
import { match } from "ts-pattern"

function copyToClipboard(data: string) {
  try {
    const clipboard = match(os.platform())
      .with("win32", () => "clip")
      .with("darwin", () => "pbcopy")
      .with("linux", () => "xclip -selection clipboard")
      .otherwise(() => {
        console.error("Unsupported platform:", os.platform())
        throw Error("Unsupported Platform")
      })

    const command = `echo ${data} | ${clipboard}`
    execSync(command)
    console.log(`${data} copied to clipboard successfully.`)
  } catch (error) {
    console.error("Failed to copy data to clipboard.", error)
  }
}

async function main() {
  try {
    const res = await fetch("https://icanhazip.com/")
    const ip = (await res.text()).trim()
    console.log(ip)
    console.log("-------------")
    copyToClipboard(ip)
  } catch {
    console.error("Error happened")
  }
}

main()
