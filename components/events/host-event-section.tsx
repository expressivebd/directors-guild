import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HostEventSection() {
  return (
    <section className="py-16 bg-zinc-900/70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Host an Event with Us</h2>
          <p className="text-lg text-gray-300 mb-8">
            Are you interested in hosting a screening, workshop, or networking event with the Directors Guild? We
            welcome collaboration opportunities.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
