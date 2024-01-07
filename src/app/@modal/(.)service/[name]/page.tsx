import ServicePage from "@/app/service/[name]/page"

import { ServiceDrawer as Drawer } from "./drawer"

export default function ServiceDrawer({
  params,
}: {
  params: {
    name: string
  }
}) {
  return (
    <Drawer>
      <ServicePage params={params} />
    </Drawer>
  )
}
