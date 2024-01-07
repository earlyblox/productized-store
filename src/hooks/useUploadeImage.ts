import { useState } from "react"
import { z } from "zod"

import { storage } from "@/lib/storage" // Assuming Storage is in the same directory

const MAX_RETRIES = 3

// Define a schema for the file input
// const fileSchema = z.object({
//   name: z.string(),
//   size: z.number().min(1), // Validate that the file is not empty
//   type: z.string().regex(/^image\//), // Validate that the file is an image
// })

// type FileInput = z.infer<typeof fileSchema>

const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [response, setResponse] = useState<string | null>(null)

  const uploadImage = async (file: Buffer, fileName: string) => {
    setIsLoading(true)
    setError(null)
    let retries = 0
    while (retries < MAX_RETRIES) {
      try {
        // Validate the file input against the schema
        // fileSchema.parse(file)

        const result = await storage.uploadImage(file, fileName)
        setResponse(result)
        break
      } catch (err) {
        if (retries >= MAX_RETRIES - 1) {
          setError(err as Error)
        }
      } finally {
        retries += 1
      }
    }
    setIsLoading(false)
  }

  return { uploadImage, isLoading, error, response }
}

export default useUploadImage
