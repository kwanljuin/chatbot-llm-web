import Link from "next/link";

const supportChannels = [
  {
    title: "24/7 Live Chat",
    description: "Get instant help from our support team",
    icon: "💬",
    availability: "Available 24/7",
    action: "Start Chat",
    href: "#chat",
  },
  {
    title: "Email Support",
    description: "Send us detailed questions and get comprehensive answers",
    icon: "📧",
    availability: "Response within 4 hours",
    action: "Send Email",
    href: "mailto:support@techcorp.com",
  },
  {
    title: "Phone Support",
    description: "Speak directly with our technical experts",
    icon: "📞",
    availability: "Mon-Fri 9AM-6PM EST",
    action: "Call Now",
    href: "tel:+1-800-TECHCORP",
  },
  {
    title: "Community Forum",
    description: "Connect with other users and share knowledge",
    icon: "👥",
    availability: "Active community discussions",
    action: "Visit Forum",
    href: "/forum",
  },
];

const resources = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API references",
    icon: "📚",
    href: "/docs",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides for all features",
    icon: "🎥",
    href: "/tutorials",
  },
  {
    title: "Webinars",
    description: "Live training sessions and product demos",
    icon: "🎓",
    href: "/webinars",
  },
  {
    title: "Status Page",
    description: "Real-time system status and maintenance updates",
    icon: "🔍",
    href: "/status",
  },
];

const commonIssues = [
  {
    title: "Account & Billing",
    issues: [
      "How to update payment information",
      "Understanding your invoice",
      "Changing subscription plans",
      "Account security settings",
    ],
  },
  {
    title: "Technical Issues",
    issues: [
      "Troubleshooting connection problems",
      "API integration help",
      "Performance optimization tips",
      "Error code explanations",
    ],
  },
  {
    title: "Getting Started",
    issues: [
      "Initial setup and configuration",
      "User account creation",
      "First-time login issues",
      "Feature overview and tutorials",
    ],
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Support Center</h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            We're here to help you succeed. Choose from multiple support
            channels, browse our resources, or get instant answers from our AI
            assistant.
          </p>
        </div>

        {/* Support Channels */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get Help Your Way</h2>
            <p className="text-xl text-base-content/70">
              Multiple ways to reach our expert support team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{channel.icon}</div>
                  <h3 className="card-title justify-center text-lg mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-base-content/70 mb-4">
                    {channel.description}
                  </p>
                  <div className="text-sm text-primary mb-4">
                    {channel.availability}
                  </div>
                  <div className="card-actions justify-center">
                    <a href={channel.href} className="btn btn-primary btn-sm">
                      {channel.action}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Self-Service Resources */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Self-Service Resources</h2>
            <p className="text-xl text-base-content/70">
              Find answers quickly with our comprehensive knowledge base
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="card-title justify-center text-lg mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-base-content/70">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Common Issues</h2>
            <p className="text-xl text-base-content/70">
              Quick solutions for frequently encountered problems
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {commonIssues.map((category, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.issues.map((issue, issueIndex) => (
                      <li key={issueIndex} className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-primary mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                        <Link
                          href="/faq"
                          className="text-sm hover:text-primary transition-colors"
                        >
                          {issue}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Plans */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Support Plans</h2>
            <p className="text-xl text-base-content/70">
              Choose the level of support that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-2">Standard</h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  Included
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Email support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Community forum access
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Knowledge base
                  </li>
                </ul>
                <div className="card-actions">
                  <button className="btn btn-outline w-full">
                    Current Plan
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border-2 border-primary">
              <div className="card-body">
                <div className="badge badge-primary mb-2">Most Popular</div>
                <h3 className="card-title text-2xl mb-2">Professional</h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  $99/month
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Priority email & chat support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Phone support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Technical account manager
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom integrations assistance
                  </li>
                </ul>
                <div className="card-actions">
                  <Link href="/contact" className="btn btn-primary w-full">
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  Custom
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    24/7 dedicated support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Dedicated support team
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    On-site training available
                  </li>
                </ul>
                <div className="card-actions">
                  <Link href="/contact" className="btn btn-outline w-full">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Support */}
        <section>
          <div className="alert alert-info">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold">Emergency Support</h3>
              <div className="text-sm">
                For critical production issues outside business hours,
                Enterprise customers can call our emergency hotline at
                <a href="tel:+1-800-EMERGENCY" className="font-bold ml-1">
                  +1-800-EMERGENCY
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
