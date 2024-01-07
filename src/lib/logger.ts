export class Logger {
  readonly runtime: string
  constructor(runtime: "client" | "server") {
    this.runtime = runtime
  }

  log() {
    return null
  }

  debug() {
    return null
  }

  warn() {
    return null
  }
}

export const serverLogger = new Logger("server")
export const clientLogger = new Logger("client")
