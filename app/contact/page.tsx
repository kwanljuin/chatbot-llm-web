"use client";

import { useState } from "react";

const contactInfo = [
  {
    title: "General Inquiries",
    email: "info@techcorp.com",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Fri 9AM-6PM EST",
  },
  {
    title: "Sales",
    email: "sales@techcorp.com",
    phone: "+1 (555) 123-SALE",
    hours: "Mon-Fri 8AM-8PM EST",
  },
  {
    title: "Technical Support",
    email: "support@techcorp.com",
    phone: "+1 (555) 123-HELP",
    hours: "24/7 Support Available",
  },
];

const offices = [
  {
    city: "San Francisco",
    address: "123 Innovation Street\nSan Francisco, CA 94105\nUnited States",
    phone: "+1 (415) 123-4567",
  },
  {
    city: "New York",
    address: "456 Business Avenue\nNew York, NY 10001\nUnited States",
    phone: "+1 (212) 123-4567",
  },
  {
    city: "London",
    address: "789 Technology Lane\nLondon EC1A 1BB\nUnited Kingdom",
    phone: "+44 20 1234 5678",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      inquiryType: "general",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg text-base-content/70 mb-6">
            Your message has been sent successfully. We'll get back to you
            within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Ready to transform your business with innovative technology
            solutions? Get in touch with our team of experts today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Inquiry Type</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="careers">Careers</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-32"
                    placeholder="Tell us about your project or question..."
                    required
                  ></textarea>
                </div>

                <div className="form-control pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Get in Touch</h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                      <div className="space-y-1 text-base-content/70">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <a
                            href={`mailto:${info.email}`}
                            className="hover:text-primary"
                          >
                            {info.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <a
                            href={`tel:${info.phone.replace(/\s/g, "")}`}
                            className="hover:text-primary"
                          >
                            {info.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{info.hours}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Our Offices</h2>

                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-secondary pl-4"
                    >
                      <h3 className="font-bold text-lg mb-2">{office.city}</h3>
                      <div className="space-y-1 text-base-content/70">
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div className="whitespace-pre-line">
                            {office.address}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <a
                            href={`tel:${office.phone.replace(/\s/g, "")}`}
                            className="hover:text-primary"
                          >
                            {office.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Need Quick Help?</h2>
                <div className="space-y-3">
                  <a href="/faq" className="btn btn-accent btn-outline w-full">
                    Browse FAQ
                  </a>
                  <a
                    href="/support"
                    className="btn btn-accent btn-outline w-full"
                  >
                    Visit Support Center
                  </a>
                  <button
                    onClick={() => {
                      // This would trigger the floating chatbot
                      const chatButton = document.querySelector(
                        "[data-chat-trigger]"
                      ) as HTMLButtonElement;
                      if (chatButton) chatButton.click();
                    }}
                    className="btn btn-accent btn-outline w-full"
                  >
                    Start Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="mt-20">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6 text-center">
                Visit Our Headquarters
              </h2>
              <div className="bg-base-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🗺️</div>
                  <p className="text-base-content/70">
                    Interactive map would be embedded here
                  </p>
                  <p className="text-sm text-base-content/50">
                    123 Innovation Street, San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
