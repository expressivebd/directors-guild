"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "lucide-react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactInfo() {
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={infoRef}
      initial={{ opacity: 0, x: 20 }}
      animate={infoInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="bg-zinc-900 p-8 rounded-lg"
    >
      <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-600 p-3 rounded-full">
            <MapPinIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Our Location</h3>
            <p className="text-gray-300">
              123 Directors Avenue
              <br />
              Suite 456
              <br />
              Los Angeles, CA 90028
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-green-600 p-3 rounded-full">
            <PhoneIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Phone</h3>
            <p className="text-gray-300">
              Main: (123) 456-7890
              <br />
              Membership: (123) 456-7891
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-green-600 p-3 rounded-full">
            <MailIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Email</h3>
            <p className="text-gray-300">
              General: info@directorsguild.org
              <br />
              Membership: members@directorsguild.org
              <br />
              Events: events@directorsguild.org
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-green-600 p-3 rounded-full">
            <ClockIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Office Hours</h3>
            <p className="text-gray-300">
              Monday - Friday: 9:00 AM - 5:00 PM
              <br />
              Saturday - Sunday: Closed
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Office Address</h3>
          <p className="flex items-start gap-2 text-gray-300">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
            123​ Cinema Lane, Los Angeles CA 90001
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Email</h3>
          <p className="flex items-center gap-2 text-gray-300">
            <Mail className="h-5 w-5 shrink-0 text-green-400" />
            info@directorsguild.org
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Phone</h3>
          <p className="flex items-center gap-2 text-gray-300">
            <Phone className="h-5 w-5 shrink-0 text-green-400" />
            +1&nbsp;(555)&nbsp;123-4567
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
        <div className="flex gap-4">
          <a href="#" className="bg-zinc-800 p-3 rounded-full hover:bg-green-600 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a href="#" className="bg-zinc-800 p-3 rounded-full hover:bg-green-600 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="bg-zinc-800 p-3 rounded-full hover:bg-green-600 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-.748-1.15-.137-.353-.3-.882-.344-1.857-.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-.748-1.15-.137-.353-.3-.882-.344-1.857-.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-.748-1.15-.137-.353-.3-.882-.344-1.857-.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-.748-1.15-.137-.353-.3-.882-.344-1.857-.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858zm-10.615 12.816v-8l8 3.993-8 4.007z"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
