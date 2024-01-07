import Link from "next/link"
import { sourceSerif } from "@/fonts"
import { Search } from "lucide-react"
import Marquee from "react-fast-marquee"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { DrawerTrigger } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Service, ServiceCard } from "@/components/service-card"

const SERVICES: Service[] = [
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
  },
  {
    name: "Component Composition",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
  },
  {
    name: "Redux Rhapsody",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
  },
  {
    name: "Hook Harmony",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
  },
  {
    name: "Context Concerto",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
  },
]

const TRENDING_SEARCHES: {
  search: string
  tag: string
}[] = [
  {
    search: "Copy Writing",
    tag: "copy-writing",
  },
  {
    search: "Web Development",
    tag: "web-dev",
  },
  {
    search: "Design",
    tag: "design",
  },
  {
    search: "Content",
    tag: "content",
  },
]

export function DiscoverPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h1
            className={cn(
              "text-3xl font-normal leading-10 -tracking-wide sm:text-4xl md:text-7xl",
              sourceSerif.className
            )}
          >
            Discover Productized Services
          </h1>
          <h2 className="mx-auto max-w-[700px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            Explore the best productized services in the market.
          </h2>
        </div>
        {/* SearchBar */}
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 mx-16 p-4 backdrop-blur">
          <form>
            <div className="relative mx-auto max-w-xl">
              <Search className="text-muted-foreground absolute left-4 top-4 h-6 w-6 opacity-50" />
              <Input placeholder="Search" className="h-14 rounded-full pl-12" />
            </div>
          </form>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-center gap-3">
          <p className="text-sm">Trending Searches: </p>

          {TRENDING_SEARCHES.map(({ search, tag }) => (
            <Link
              key={tag}
              href={`/search/${tag}`}
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "outline",
                }),
                "rounded-full"
              )}
            >
              {search}
            </Link>
          ))}
        </div>
        {/* Services */}
        <div className="grid w-full grid-cols-1 items-stretch justify-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Link key={service.name} passHref href={`/service/${service.name}`}>
              <ServiceCard
                service={service}
                className="w-[300px]"
                aspectRatio="landscape"
                width={300}
                height={330}
              />
            </Link>
          ))}
        </div>
        {/* More Categories */}
      </div>
      <Marquee pauseOnHover className="my-12" speed={80}>
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.name}
            service={service}
            className="mx-4 w-[250px]"
            aspectRatio="square"
            width={250}
            height={250}
          />
        ))}
      </Marquee>
    </section>
  )
}
