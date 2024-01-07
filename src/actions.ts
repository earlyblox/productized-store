"use server"

import { revalidatePath } from "next/cache"

let i = 0

export async function uploadImage(state: unknown, formData: FormData) {
  try {
    console.log(++i)
    throw Error()
    revalidatePath("/onboarding")
    return {
      status: "success",
      message: "Image successfully uploaded",
    } as const
  } catch (e: unknown) {
    return { status: "error", message: "Image couldn't be uploaded" } as const
  }
}
