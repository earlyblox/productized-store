/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lXMNd24IAfB
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
  return (
    <main>
      <Component />
    </main>
  )
}

export function Component() {
  return (
    <div className="mx-auto grid max-w-2xl items-start gap-6 px-4 py-6">
      <div className="grid gap-4">
        <Label htmlFor="images">Upload Images</Label>
        <Input id="images" multiple type="file" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <img
          alt="Uploaded Image"
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          height={300}
          src="/placeholder.svg"
          width={300}
        />
        <img
          alt="Uploaded Image"
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          height={300}
          src="/placeholder.svg"
          width={300}
        />
        <img
          alt="Uploaded Image"
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          height={300}
          src="/placeholder.svg"
          width={300}
        />
        <img
          alt="Uploaded Image"
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          height={300}
          src="/placeholder.svg"
          width={300}
        />
        <img
          alt="Uploaded Image"
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          height={300}
          src="/placeholder.svg"
          width={300}
        />
        <img
          alt="Uploaded Image"
          className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
          height={300}
          src="/placeholder.svg"
          width={300}
        />
      </div>
      <div className="flex justify-center">
        <Button className="mr-2" variant="outline">
          Previous
        </Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  )
}
