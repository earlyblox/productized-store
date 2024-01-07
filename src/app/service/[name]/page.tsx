"use client"

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CarouselDemo } from "./service-carousal"

export default function ServicePage({
  params,
}: {
  params: {
    name: string
  }
}) {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center">
      <Tabs defaultValue="showcase">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>
      <Avatar>
        <AvatarFallback>{params.name}</AvatarFallback>
      </Avatar>
      <CarouselDemo />
    </main>
  )
}
