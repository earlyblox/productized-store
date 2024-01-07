"use client"

import React, { Children, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { createPortal } from "react-dom"
import { Drawer } from "vaul"

import { Button } from "@/components/ui/button"

export function ServiceDrawer({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  function onDismiss() {
    setOpen(false)
    router.replace("/")
  }

  return createPortal(
    <Drawer.Root open={open} onClose={onDismiss}>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-foreground/50 fixed inset-0 z-50" />
        <div className="relative">
          <Drawer.Content className="bg-background container fixed inset-x-0 bottom-0 z-50 mt-24 flex h-[94%] flex-col rounded-t-[10px]">
            <div className="flex-1 rounded-t-[10px] p-4">
              <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />
              <Drawer.Close
                className="absolute right-0 top-0 m-4"
                onClick={onDismiss}
                asChild
              >
                <Button size="icon" className="rounded-full" variant="outline">
                  <X className="h-5 w-5" />
                </Button>
              </Drawer.Close>

              {children}
            </div>
          </Drawer.Content>
        </div>
      </Drawer.Portal>
    </Drawer.Root>,
    document.body!
  )
}
