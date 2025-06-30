"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    toast({ title: "Message sent!", description: "We’ll get back to you shortly." })
    ;(e.target as HTMLFormElement).reset()
    setLoading(false)
  }

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, x: -20 }}
      animate={formInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Your Name
            </label>
            <Input id="name" name="name" placeholder="Your Name" required className="bg-zinc-900" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input id="email" name="email" type="email" placeholder="Email Address" required className="bg-zinc-900" />
          </div>
        </div>

        <div>
          <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
            Inquiry Type
          </label>
          <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
            <SelectTrigger className="bg-zinc-900">
              <SelectValue placeholder="Select inquiry type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="membership">Membership</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="press">Press & Media</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <Input id="subject" name="subject" placeholder="Subject" required className="bg-zinc-900" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <Textarea id="message" name="message" placeholder="Message" rows={5} required className="bg-zinc-900" />
        </div>

        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={loading}>
          {loading ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </motion.div>
  )
}
