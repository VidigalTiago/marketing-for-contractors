'use client'

import { useState } from 'react'
import { X, ArrowRight, CheckCircle2 } from 'lucide-react'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

const budgetOptions = [
  'Less than US$1,000/month',
  'US$1,000–2,500/month',
  'US$2,500–5,000/month',
  'US$5,000–10,000/month',
  'More than US$10,000/month',
  'Not sure yet',
]

const serviceOptions = [
  'Roofing',
  'Siding',
  'Decking',
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Flooring',
  'Home Additions',
  'Custom Homes',
  'General Contracting',
  'Other',
]

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    website: '',
    services: '',
    budget: '',
    email: '',
    phone: '',
    message: '',
  })

  if (!open) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto border border-[#D0D5DD] shadow-2xl">
        {/* Corner marks */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#1565D8]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#1565D8]" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D0D5DD]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-4 h-px bg-[#1565D8]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#1565D8]">
                Partnership Inquiry
              </span>
            </div>
            <h2 id="modal-title" className="text-lg font-extrabold text-[#0A0A0A]">
              Start Your Consultation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#667085] hover:text-[#0A0A0A] transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-14 h-14 border border-[#1565D8]/30 bg-[#1565D8]/5 flex items-center justify-center">
                <CheckCircle2 size={28} className="text-[#1565D8]" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#0A0A0A] mb-2">
                  Message Received
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed max-w-xs mx-auto">
                  I&apos;ll review your information and reach out within 1–2 business days to discuss your project.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 border border-[#D0D5DD] px-5 py-2.5 text-sm font-semibold text-[#0A0A0A] hover:border-[#1565D8] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                    Name <span className="text-[#1565D8]">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#D0D5DD] focus:outline-none focus:border-[#1565D8] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                    Company Name <span className="text-[#1565D8]">*</span>
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    placeholder="Smith Contractors LLC"
                    className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#D0D5DD] focus:outline-none focus:border-[#1565D8] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                  Website
                </label>
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#D0D5DD] focus:outline-none focus:border-[#1565D8] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                  Services Offered <span className="text-[#1565D8]">*</span>
                </label>
                <select
                  name="services"
                  value={form.services}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#1565D8] transition-colors appearance-none"
                >
                  <option value="">Select primary service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                  Monthly Ad Spend <span className="text-[#1565D8]">*</span>
                </label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#1565D8] transition-colors appearance-none"
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                    Email <span className="text-[#1565D8]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#D0D5DD] focus:outline-none focus:border-[#1565D8] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#D0D5DD] focus:outline-none focus:border-[#1565D8] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell me about your business and what you are looking to achieve..."
                  className="w-full border border-[#D0D5DD] bg-white px-3 py-2.5 text-sm text-[#0A0A0A] placeholder:text-[#D0D5DD] focus:outline-none focus:border-[#1565D8] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1565D8] text-white font-semibold py-3.5 text-sm hover:bg-[#1255c0] transition-colors duration-200"
              >
                Send Partnership Request
                <ArrowRight size={16} />
              </button>

              <p className="text-[11px] text-[#667085] text-center">
                No commitment required. I&apos;ll follow up within 1–2 business days.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
