"use client";

import { useState } from "react";

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What services does TechCorp offer?",
        answer:
          "TechCorp offers a comprehensive suite of technology solutions including cloud infrastructure, data analytics, security solutions, workflow automation, mobile development, and AI-powered platforms. We serve businesses of all sizes with both ready-made products and custom solutions.",
      },
      {
        question: "How do I get started with TechCorp?",
        answer:
          "Getting started is easy! You can contact our sales team through the contact form, schedule a demo, or start with our free trial offerings. Our team will work with you to understand your needs and recommend the best solutions for your business.",
      },
      {
        question: "Do you offer custom development services?",
        answer:
          "Yes, we offer custom development services tailored to your specific business requirements. Our expert development team can create bespoke solutions using the latest technologies and industry best practices.",
      },
    ],
  },
  {
    category: "Billing & Pricing",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, bank transfers, and can set up invoicing for enterprise customers. Payment terms can be monthly, quarterly, or annually depending on your preference and plan.",
      },
      {
        question: "Do you offer discounts for annual plans?",
        answer:
          "Yes, we offer significant discounts for annual subscriptions. Typically, annual plans save you 15-20% compared to monthly billing. Enterprise customers may be eligible for additional volume discounts.",
      },
      {
        question: "Can I change my plan later?",
        answer:
          "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle, and we'll prorate any differences in cost.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "Yes, most of our products offer free trials ranging from 14 to 30 days. This allows you to test our solutions thoroughly before making a commitment.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "What kind of support do you provide?",
        answer:
          "We provide 24/7 technical support through multiple channels including email, chat, and phone. Enterprise customers also get dedicated account managers and priority support.",
      },
      {
        question: "How quickly do you respond to support requests?",
        answer:
          "Our standard response times are: Critical issues - 1 hour, High priority - 4 hours, Normal priority - 24 hours. Enterprise customers receive faster response times based on their SLA.",
      },
      {
        question: "Do you provide training and onboarding?",
        answer:
          "Yes, we provide comprehensive onboarding and training programs. This includes documentation, video tutorials, webinars, and hands-on training sessions for enterprise customers.",
      },
    ],
  },
  {
    category: "Security & Compliance",
    questions: [
      {
        question: "How secure are your solutions?",
        answer:
          "Security is our top priority. All our solutions use enterprise-grade encryption, undergo regular security audits, and comply with industry standards including SOC 2, ISO 27001, and GDPR.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Data is stored in secure, tier-1 data centers with multiple geographic locations for redundancy. You can choose your preferred data residency location to meet compliance requirements.",
      },
      {
        question: "Do you comply with GDPR and other privacy regulations?",
        answer:
          "Yes, we are fully compliant with GDPR, CCPA, and other major privacy regulations. We provide data processing agreements and maintain strict data handling protocols.",
      },
    ],
  },
  {
    category: "Integration & API",
    questions: [
      {
        question: "Do your products integrate with other tools?",
        answer:
          "Yes, our products offer extensive integration capabilities with popular business tools, CRM systems, databases, and third-party services through our robust API and pre-built connectors.",
      },
      {
        question: "Do you provide API access?",
        answer:
          "Yes, all our products come with comprehensive REST APIs and SDKs in multiple programming languages. Our API documentation includes examples and interactive testing tools.",
      },
      {
        question: "Can you help with custom integrations?",
        answer:
          "Absolutely! Our professional services team can help you build custom integrations with your existing systems and workflows.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = faqData.map((cat) => cat.category);

  const filteredFAQs =
    faqData
      .find((cat) => cat.category === activeCategory)
      ?.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Find answers to common questions about our products, services, and
            support. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="input input-bordered input-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 sticky top-24">
              <div className="card-body">
                <h3 className="card-title mb-4">Categories</h3>
                <ul className="menu p-0">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        className={`justify-start ${
                          activeCategory === category ? "active" : ""
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-plus bg-base-100 shadow-lg"
                  >
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-lg font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p className="text-base-content/80">{faq.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold mb-2">No results found</h3>
                  <p className="text-base-content/70">
                    Try adjusting your search terms or browse different
                    categories.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content">
            <div className="card-body">
              <h2 className="card-title text-3xl justify-center mb-4">
                Still Have Questions?
              </h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Our support team is here to help! Contact us directly and we'll
                get back to you quickly.
              </p>
              <div className="card-actions justify-center gap-4">
                <a
                  href="mailto:support@techcorp.com"
                  className="btn btn-accent"
                >
                  Email Support
                </a>
                <a href="/support" className="btn btn-outline btn-accent">
                  Visit Support Center
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
