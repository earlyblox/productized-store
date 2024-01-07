"use client"

import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { uploadImage } from "@/actions"
import { MAX_FILE_SIZE, MAX_IMAGES } from "@/constants"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { FileUp, X } from "lucide-react"
import { useFormState } from "react-dom"
import ReactCrop, { Crop } from "react-image-crop"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import "react-image-crop/dist/ReactCrop.css"

interface UploadImageFormProps {}

type FormState = { status: string; message: string } | null

export const UploadImageForm: FC<UploadImageFormProps> = () => {
  const [state, formAction] = useFormState(uploadImage, null)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [ref] = useAutoAnimate<HTMLDivElement>()

  if (state?.status === "success") {
    toast("Success", {
      dismissible: true,
      description: state.message,
    })
  }

  if (state?.status === "error") {
    toast("Oops", {
      description: state.message,
      dismissible: true,
      action: {
        label: "Try again",
        onClick: () => console.log("wow"),
      },
    })
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      if (files.length > MAX_IMAGES || selectedImages.length > MAX_IMAGES - 1) {
        return toast("You can select a maximum of 4 images.")
      }
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.startsWith("image/")) {
          return toast("Only image files are allowed.")
        }

        if (files[i].size > MAX_FILE_SIZE) {
          return toast("Each file should be less than 200KB.")
        }
      }
      setSelectedImages([...selectedImages, ...Array.from(files)])
    }
  }

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  useEffect(() => {}, [])

  return (
    <div className="rounded-md bg-white px-4 py-6 shadow-md sm:w-full sm:max-w-md sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
        Upload Images
      </h2>
      <form
        action={formAction}
        // onSubmit={(e) => {
        //   e.preventDefault()
        //   formAction(selectedImages)
        // }}
        className="mt-8 space-y-6"
      >
        <FileInput
          totalSelectedImages={selectedImages.length}
          handleFileChange={handleFileChange}
        />
        <div ref={ref} className="grid grid-cols-2 gap-4">
          {selectedImages.map((image, index) => (
            <ImagePreview
              key={index}
              image={image}
              index={index}
              onRemove={handleRemoveImage}
            />
          ))}
        </div>
        <Button className="w-full" type="submit">
          Upload Images
        </Button>
      </form>
    </div>
  )
}

function FileInput({
  totalSelectedImages,
  handleFileChange,
}: {
  totalSelectedImages: number
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  if (totalSelectedImages === MAX_IMAGES) return null
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="images">Drag and Drop or Select Images</Label>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-md border-2 border-dashed border-gray-300 p-6">
        <FileUp className="h-12 w-12" />
        <Input
          className="hidden"
          id="images"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label
          className="cursor-pointer text-sm text-gray-600"
          htmlFor="images"
        >
          Click to select files
        </label>
      </div>
    </div>
  )
}

function ImagePreview({
  image,
  index,
  onRemove,
}: {
  image: File
  index: number
  onRemove: (index: number) => void
}) {
  return (
    <>
      <ImageCropDialog image={image}>
        <div className="relative">
          <Image
            alt={`Image Preview ${index + 1}`}
            className="aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height="100"
            src={URL.createObjectURL(image)}
            width="177"
          />
          <Button
            asChild
            size="icon"
            variant="outline"
            className="absolute right-0 top-0 m-2 cursor-pointer rounded-full p-1"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(index)
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </ImageCropDialog>
    </>
  )
}

function ImageCropDialog({
  children,
  image,
}: {
  children: React.ReactNode
  image: File
}) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)

  const onImageLoaded = useCallback((): boolean => {
    return false // Return false when setting crop to prevent auto zooming
  }, [])

  const onCropComplete = (crop: Crop, percentCrop: Crop) => {
    setCompletedCrop(percentCrop)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&aps;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ReactCrop
            aspect={16 / 9}
            // onImageLoaded={onImageLoaded}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={onCropComplete}
          >
            {
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img src={URL.createObjectURL(image)} />
            }
          </ReactCrop>
        </div>
      </DialogContent>
    </Dialog>
  )
}
