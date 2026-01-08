export default function Home() {


  const username = "postgres";
  const passowrd  = "EreifsF&3";
  const port = 5432;

  const hello = ()=>{
    console.log(username);
    console.log(passowrd);
    console.log(port)
  }
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              data-testid="hero-title"
            >
              Welcome to NextApp
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              A production-ready Next.js application with modern UI,
              comprehensive testing, and automated CI/CD deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                data-testid="hero-cta-primary"
              >
                Get Started
              </button>
              <button
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                data-testid="hero-cta-secondary"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Fast Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with Next.js 16 for optimal performance and SEO.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Fully Tested
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive UI testing with Playwright ensures reliability.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5.36-5.36l.707-.707M5.337 17h4.673"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                CI/CD Ready
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                GitHub Actions workflow for automated testing and deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { name: "Next.js", version: "16" },
              { name: "React", version: "19" },
              { name: "Tailwind CSS", version: "4" },
              { name: "TypeScript", version: "5" },
              { name: "Playwright", version: "1.48" },
              { name: "GitHub Actions", version: "-" },
              { name: "Vercel", version: "-" },
              { name: "ESLint", version: "9" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tech.version}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Deploy your Next.js application in minutes with our production-ready
            setup.
          </p>
          <button
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            data-testid="cta-deploy-btn"
          >
            Deploy Now
          </button>
        </div>
      </section>
    </div>
  );
}
