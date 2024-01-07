// import {
//   PutObjectCommand,
//   PutObjectCommandInput,
//   S3Client,
// } from "@aws-sdk/client-s3"
// import sharp from "sharp"

// import { env } from "@/env.mjs"

// class Storage {
//   private s3Client: S3Client
//   private bucketName: string

//   constructor(s3Client: S3Client, bucketName: string) {
//     this.s3Client = s3Client
//     this.bucketName = bucketName
//   }

//   async uploadImage(file: Buffer, fileName: string): Promise<string> {
//     const resizedImageBuffer = await sharp(file).resize(400, 500).toBuffer()

//     const params: PutObjectCommandInput = {
//       Bucket: this.bucketName,
//       Key: `${Date.now()}-${fileName}`,
//       Body: resizedImageBuffer,
//       ContentType: "image/jpeg",
//     }

//     const command = new PutObjectCommand(params)
//     await this.s3Client.send(command)

//     return fileName
//   }

//   static Builder() {
//     return new StorageBuilder()
//   }
// }

// class StorageBuilder {
//   private s3Client: S3Client | undefined
//   private bucketName: string | undefined

//   setS3Client(s3Client: S3Client) {
//     this.s3Client = s3Client
//     return this
//   }

//   setBucketName(bucketName: string) {
//     this.bucketName = bucketName
//     return this
//   }

//   build() {
//     if (!this.s3Client || !this.bucketName) {
//       throw new Error("Missing required fields")
//     }

//     return new Storage(this.s3Client, this.bucketName)
//   }
// }

// export const storage = Storage.Builder()
//   .setS3Client(
//     new S3Client({
//       region: env.AWS_REGION,
//       credentials: {
//         accessKeyId: env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: env.AWS_SECRET_KEY,
//       },
//     })
//   )
//   .setBucketName(env.AWS_BUCKET_NAME)
//   .build()

import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"

import { env } from "@/env.mjs"

const HEIGHT = 400

class Storage {
  private s3Client: S3Client
  private bucketName: string

  constructor(s3Client: S3Client, bucketName: string) {
    this.s3Client = s3Client
    this.bucketName = bucketName
  }

  async uploadImage(
    file: Buffer,
    contentType: string
  ): Promise<{ url: string; fields: any }> {
    const resizedImageBuffer = await sharp(file).resize(400, HEIGHT).toBuffer()

    const { url, fields } = await createPresignedPost(this.s3Client, {
      Bucket: this.bucketName,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    return { url, fields }
  }

  static Builder() {
    return new StorageBuilder()
  }
}

class StorageBuilder {
  private s3Client: S3Client | undefined
  private bucketName: string | undefined

  setS3Client(s3Client: S3Client) {
    this.s3Client = s3Client
    return this
  }

  setBucketName(bucketName: string) {
    this.bucketName = bucketName
    return this
  }

  build() {
    if (!this.s3Client || !this.bucketName) {
      throw new Error("Missing required fields")
    }

    return new Storage(this.s3Client, this.bucketName)
  }
}

export const storage = Storage.Builder()
  .setS3Client(
    new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_KEY,
      },
    })
  )
  .setBucketName(env.AWS_BUCKET_NAME)
  .build()
