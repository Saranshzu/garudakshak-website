export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Garudakshak
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          AI-powered RF-based Drone Detection and Neutralization System.
          Protecting skies with intelligent technology.
        </p>
        <a
          href="#contact"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium"
        >
          Get in Touch
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 text-center bg-gray-900">
        <h2 className="text-4xl font-semibold mb-6">About Us</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Garudakshak is building cutting-edge defense technology to detect,
          track, and neutralize rogue drones using advanced AI and RF systems.
          Our mission is to ensure safe skies for civilians, critical
          infrastructure, and defense operations.
        </p>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold mb-6">Our Technology</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">RF Detection</h3>
            <p className="text-gray-300">
              Using advanced RF spectrum monitoring to detect and classify
              drone signals across multiple bands.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">AI Tracking</h3>
            <p className="text-gray-300">
              Intelligent algorithms for real-time direction finding and
              precise positioning of drones.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Neutralization</h3>
            <p className="text-gray-300">
              Developing high-power microwave and advanced counter-drone
              systems for secure airspace defense.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 text-center bg-gray-900">
        <h2 className="text-4xl font-semibold mb-6">Contact Us</h2>
        <p className="text-gray-300 mb-6">
          Interested in partnering or learning more about Garudakshak?
        </p>
        <a
          href="mailto:your-email@example.com"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-medium"
        >
          Email Us
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-950 text-gray-500 text-sm">
        © {new Date().getFullYear()} Garudakshak. All rights reserved.
      </footer>
    </main>
  );
}
