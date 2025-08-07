import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-8">
              Innovative Solutions for
              <span className="text-primary"> Modern Business</span>
            </h1>
            <p className="text-xl mb-8 text-base-content/80">
              TechCorp delivers cutting-edge technology solutions that transform
              the way businesses operate. From software development to digital
              transformation, we're your trusted partner in innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn btn-primary btn-lg">
                Explore Products
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose TechCorp?</h2>
            <p className="text-xl text-base-content/70">
              We combine expertise, innovation, and reliability to deliver
              exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="card-title justify-center mb-4">
                  Innovation First
                </h3>
                <p>
                  Stay ahead with cutting-edge technology solutions designed for
                  the future of business.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="card-title justify-center mb-4">
                  Secure & Reliable
                </h3>
                <p>
                  Enterprise-grade security and 99.9% uptime guarantee for
                  mission-critical applications.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="card-title justify-center mb-4">
                  Expert Support
                </h3>
                <p>
                  24/7 dedicated support from our team of certified
                  professionals and industry experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="stat">
              <div className="stat-value">500+</div>
              <div className="stat-desc text-primary-content/80">
                Happy Clients
              </div>
            </div>
            <div className="stat">
              <div className="stat-value">1000+</div>
              <div className="stat-desc text-primary-content/80">
                Projects Completed
              </div>
            </div>
            <div className="stat">
              <div className="stat-value">99.9%</div>
              <div className="stat-desc text-primary-content/80">
                Uptime Guarantee
              </div>
            </div>
            <div className="stat">
              <div className="stat-value">24/7</div>
              <div className="stat-desc text-primary-content/80">
                Expert Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-base-content/70">
            Join hundreds of companies that trust TechCorp for their technology
            needs
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  );
}
