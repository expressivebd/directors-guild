
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import MapSection from "@/components/contact/map-section"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Page heading */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          We’d love to hear from you. Use the form or the details below to reach the Directors Guild team.
        </p>
      </header>

      {/* Form & details */}
      <section className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        <ContactInfo />
      </section>

      {/* Map */}
      <MapSection />
    </div>
  )
}
