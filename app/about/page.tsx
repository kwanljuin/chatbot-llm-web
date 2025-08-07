// src/app/about/page.tsx
import Link from "next/link";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "15+ years in tech leadership, former VP at major tech companies.",
    image: "👩‍💼",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Expert in cloud architecture and AI systems with 12+ years experience.",
    image: "👨‍💻",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    bio: "Product strategy specialist with a passion for user experience.",
    image: "👩‍🎨",
  },
  {
    name: "David Kumar",
    role: "Lead Engineer",
    bio: "Full-stack developer and open-source contributor.",
    image: "👨‍🔬",
  },
];

const milestones = [
  {
    year: "2018",
    event: "TechCorp founded with a vision to democratize technology",
  },
  {
    year: "2019",
    event: "Launched our first cloud platform, serving 50+ companies",
  },
  { year: "2020", event: "Expanded globally with offices in 3 countries" },
  { year: "2021", event: "Reached 500+ enterprise customers milestone" },
  {
    year: "2022",
    event: "Introduced AI-powered solutions and automation tools",
  },
  {
    year: "2023",
    event: "Achieved carbon-neutral operations and B-Corp certification",
  },
  {
    year: "2024",
    event: "Launched next-generation platform serving 1000+ businesses",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">About TechCorp</h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            We're on a mission to empower businesses with innovative technology
            solutions that drive growth, efficiency, and digital transformation.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6 text-base-content/80">
                To democratize access to cutting-edge technology and make
                innovation accessible to businesses of all sizes. We believe
                that the right technology can transform not just businesses, but
                entire industries.
              </p>
              <p className="text-lg text-base-content/80">
                Since our founding in 2018, we've been committed to delivering
                solutions that don't just meet today's needs, but anticipate
                tomorrow's challenges.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4">Innovation First</h3>
                <p className="text-base-content/70">
                  We invest 25% of our revenue back into R&D to ensure our
                  solutions are always at the forefront of technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-base-content/70">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-base-content/70">
                Constantly pushing boundaries and exploring new possibilities
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Partnership</h3>
              <p className="text-base-content/70">
                Building long-term relationships based on trust and mutual
                success
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-base-content/70">
                Delivering exceptional quality in everything we create and
                support
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-base-content/70">
                Committed to environmental responsibility and sustainable
                practices
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-base-content/70">
              The passionate people behind TechCorp's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="card-title justify-center text-lg">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-base-content/70">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-base-content/70">
              Key milestones in TechCorp's evolution
            </p>
          </div>

          <div className="timeline timeline-vertical">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-start timeline-box bg-primary text-primary-content font-bold">
                  {milestone.year}
                </div>
                <div className="timeline-middle">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div className="timeline-end timeline-box bg-base-200">
                  {milestone.event}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary to-secondary p-12 rounded-2xl text-primary-content">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                TechCorp by the Numbers
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-lg">Active Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-lg">Team Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg">Countries Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-lg">Uptime SLA</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title text-3xl justify-center mb-4">
                Ready to Join Our Success Story?
              </h2>
              <p className="mb-6 text-lg">
                Whether you're looking for innovative solutions or want to be
                part of our team, we'd love to hear from you.
              </p>
              <div className="card-actions justify-center gap-4">
                <Link href="/contact" className="btn btn-primary">
                  Get in Touch
                </Link>
                <Link href="/careers" className="btn btn-outline">
                  View Careers
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
