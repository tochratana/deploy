export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About NextApp
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            A comprehensive example of how to build, test, and deploy a modern
            Next.js application with production-ready practices.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Mission */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To demonstrate a modern, production-ready Next.js application
                that follows industry best practices for UI development,
                testing, and deployment. This project serves as a reference
                implementation for teams looking to build scalable web
                applications.
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What Makes This Special
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "Modern Stack",
                    desc: "Built with Next.js 16, React 19, and Tailwind CSS for optimal performance",
                  },
                  {
                    title: "Comprehensive Testing",
                    desc: "Full UI test coverage with Playwright for reliability and confidence",
                  },
                  {
                    title: "Automated CI/CD",
                    desc: "GitHub Actions workflow for lint, test, build, and deployment automation",
                  },
                  {
                    title: "Multi-Platform Deployment",
                    desc: "Ready to deploy on Vercel, Netlify, Docker, or any Node.js hosting",
                  },
                  {
                    title: "Production-Ready",
                    desc: "Environment variables, security best practices, and optimization included",
                  },
                  {
                    title: "Well-Documented",
                    desc: "Clear folder structure, test examples, and deployment guides",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Technology Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    category: "Frontend",
                    technologies: "Next.js, React, Tailwind CSS, TypeScript",
                  },
                  { category: "Testing", technologies: "Playwright, ESLint" },
                  { category: "CI/CD", technologies: "GitHub Actions" },
                  {
                    category: "Deployment",
                    technologies: "Vercel, Netlify, Docker, Node.js",
                  },
                ].map((stack, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {stack.category}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stack.technologies}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="text-blue-100 mb-8">
            Check out our documentation or deploy your own instance
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            data-testid="about-cta-btn"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
