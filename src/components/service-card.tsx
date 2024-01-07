import Image from "next/image"
import { CircleDollarSign, DollarSign, Eye } from "lucide-react"
import { match } from "ts-pattern"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export interface Service {
  name: string
  artist: string
  cover: string
}

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  service: Service
  aspectRatio?: "portrait" | "square" | "landscape"
  width?: number
  height?: number
}

export function ServiceCard({
  service,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ServiceCardProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={service.cover}
          alt={service.name}
          width={width}
          height={height}
          className={cn(
            "object-cover transition-all hover:scale-105",
            match(aspectRatio)
              .with("portrait", () => "aspect-[3/4]")
              .with("square", () => "aspect-square")
              .with("landscape", () => "aspect-video")
              .exhaustive()
          )}
        />
      </div>
      <div className="space-x-1">
        <div className="flex items-center gap-2 text-sm">
          <Avatar className="h-6 w-6">
            <AvatarImage />
            <AvatarFallback>FL</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold leading-none">{service.name}</h3>
          {/* <p className="text-muted-foreground text-xs">{service.artist}</p> */}

          <div className="ml-auto flex items-center gap-0.5 text-xs">
            <CircleDollarSign className="fill-muted-foreground/25 h-4 w-4" />
            <p>1.5k</p>
          </div>
          <div className="ml-0.5 flex items-center gap-0.5 text-xs">
            <Eye className="fill-muted-foreground/25 h-4 w-4" />
            <p>123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
