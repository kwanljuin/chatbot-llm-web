import Link from "next/link";

const products = [
  {
    id: "cloudforce",
    name: "CloudForce Enterprise",
    category: "Cloud Solutions",
    description:
      "Comprehensive cloud infrastructure management platform with automated scaling and security.",
    features: [
      "Auto-scaling",
      "Security Monitoring",
      "Cost Optimization",
      "Multi-cloud Support",
    ],
    price: "Starting at $299/month",
    popular: true,
  },
  {
    id: "datainsight",
    name: "DataInsight Analytics",
    category: "Data Analytics",
    description:
      "Advanced business intelligence and analytics platform with real-time insights.",
    features: [
      "Real-time Dashboards",
      "Predictive Analytics",
      "Custom Reports",
      "API Integration",
    ],
    price: "Starting at $199/month",
    popular: false,
  },
  {
    id: "secureconnect",
    name: "SecureConnect VPN",
    category: "Security",
    description:
      "Enterprise-grade VPN solution with zero-trust architecture and advanced threat protection.",
    features: [
      "Zero-trust Security",
      "Global Network",
      "Device Management",
      "Activity Monitoring",
    ],
    price: "Starting at $149/month",
    popular: false,
  },
  {
    id: "workflowpro",
    name: "WorkflowPro Automation",
    category: "Productivity",
    description:
      "Intelligent workflow automation platform that streamlines business processes.",
    features: [
      "Visual Workflow Builder",
      "Integration Hub",
      "Performance Analytics",
      "Team Collaboration",
    ],
    price: "Starting at $99/month",
    popular: true,
  },
  {
    id: "mobilefirst",
    name: "MobileFirst Development",
    category: "Mobile Solutions",
    description:
      "Cross-platform mobile app development framework with native performance.",
    features: [
      "Cross-platform",
      "Native Performance",
      "Push Notifications",
      "Offline Sync",
    ],
    price: "Custom Pricing",
    popular: false,
  },
  {
    id: "aiassist",
    name: "AI Assist Platform",
    category: "Artificial Intelligence",
    description:
      "AI-powered customer service and automation platform with natural language processing.",
    features: [
      "Natural Language Processing",
      "Chatbot Builder",
      "Voice Recognition",
      "Sentiment Analysis",
    ],
    price: "Starting at $399/month",
    popular: true,
  },
];

const categories = [
  "All",
  "Cloud Solutions",
  "Data Analytics",
  "Security",
  "Productivity",
  "Mobile Solutions",
  "Artificial Intelligence",
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Discover our comprehensive suite of technology solutions designed to
            accelerate your business growth and digital transformation journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button key={category} className="btn btn-outline btn-sm">
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-xl relative"
            >
              {product.popular && (
                <div className="badge badge-primary absolute top-4 right-4 z-10">
                  Popular
                </div>
              )}

              <div className="card-body">
                <div className="badge badge-outline mb-2">
                  {product.category}
                </div>
                <h2 className="card-title mb-2">{product.name}</h2>
                <p className="text-base-content/70 mb-4">
                  {product.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="text-sm space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-actions justify-between items-center">
                  <div className="text-lg font-bold text-primary">
                    {product.price}
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-sm">
                      Learn More
                    </button>
                    <Link href="/contact" className="btn btn-primary btn-sm">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Solutions CTA */}
        <div className="mt-20 text-center">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content">
            <div className="card-body">
              <h2 className="card-title text-3xl justify-center mb-4">
                Need a Custom Solution?
              </h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Our expert team can develop tailored solutions that perfectly
                match your unique business requirements and objectives.
              </p>
              <div className="card-actions justify-center">
                <Link href="/contact" className="btn btn-accent">
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
