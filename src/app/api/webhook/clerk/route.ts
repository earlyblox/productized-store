import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs"
import { WebhookEvent } from "@clerk/nextjs/server"
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library"
import { Webhook } from "svix"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"

async function validateRequest(request: Request) {
  const payloadString = await request.text()
  const headerPayload = headers()

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  }
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)
  return wh.verify(payloadString, svixHeaders) as WebhookEvent
}

export const POST = async (req: NextRequest) => {
  try {
    const payload = await validateRequest(req)
    console.log(payload.type)

    switch (payload.type) {
      case "user.created":
        const { email_addresses, id, first_name, last_name } = payload.data
        // await db.user.create({
        //   data: {
        //     name: `${first_name} ${last_name}`,
        //     email: email_addresses[0].email_address,
        //   },
        // })
        console.log("horray")
        console.log("user created", id)
        clerkClient.users.updateUserMetadata(id, {})

        break
      case "user.updated":
        break
      case "user.deleted":
        console.log("deleted user oppppsie")
        break
      case "session.created":
        break
      case "session.ended":
        break
      case "session.removed":
        break
      case "session.revoked":
        break
      case "email.created":
        break
      case "sms.created":
        break
      case "organization.created":
        break
      case "organization.updated":
        break
      case "organization.deleted":
        break
      case "organizationMembership.created":
        break
      case "organizationMembership.deleted":
        break
      case "organizationMembership.updated":
        break
      case "organizationInvitation.accepted":
        break
      case "organizationInvitation.created":
        break
      case "organizationInvitation.revoked":
        break
    }

    return NextResponse.json({ message: "Received" })
  } catch (e) {
    let errorMessage = "An error occurred."
    if (e instanceof PrismaClientUnknownRequestError) {
      errorMessage = "An unknown request error occurred in Prisma Client."
    } else if (e instanceof PrismaClientInitializationError) {
      errorMessage = "An initialization error occurred in Prisma Client."
    } else if (e instanceof PrismaClientKnownRequestError) {
      errorMessage = "A known request error occurred in Prisma Client."
    } else if (e instanceof PrismaClientValidationError) {
      errorMessage = "A validation error occurred in Prisma Client."
    } else if (e instanceof PrismaClientRustPanicError) {
      errorMessage = "A Rust panic error occurred in Prisma Client."
    }
    console.error(errorMessage, e)
    return NextResponse.json({ status: 500, body: errorMessage })
  }
}
