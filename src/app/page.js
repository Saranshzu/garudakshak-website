"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const teamMembers = [
    { name: "Saransh Duharia", role: "Founder & CEO", image: "/images/Saransh.jpg" },
    { name: "Dr. Anirban Sarkar", role: "Technical Mentor, RF Domain", image: "/images/Dr.Anirban.png" },
    { name: "Baivab Anand", role: "Head of AI & Technical Advisor", image: "/images/Baivab.png" },
    { name: "Vikrant Sharma", role: "Mechanical Engineer", image: "/images/Vikrant.png" },
    { name: "Aditya Tayal", role: "Software Developer", image: "/images/Aditya.png" },
    { name: "Aishita", role: "Electrical & RF Engineer", image: "/images/Aishita.png" },
    { name: "Edison Kho", role: "Electrical & RF Engineer", image: "/images/Edison.png" },
    { name: "Gauri Bhasker", role: "UI/UX Designer", image: "/images/Gauri.png" },
    { name: "Rohit Jhajhria", role: "Electrical & RF Engineer", image: "/images/Rohit.png" },
    { name: "Satvik", role: "Software Engineer", image: "/images/Satvik.png" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3));
    }, 5000);
    return () => clearInterval(timer);
  }, [teamMembers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 3)) % Math.ceil(teamMembers.length / 3));
  };

  return (
    <main className="bg-black text-white font-mono">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <img 
                src="/images/garudakshak.png" 
                alt="Garudakshak" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.outerHTML = `<div class="w-8 h-8 bg-gray-800 border border-gray-600"></div>`;
                }}
              />
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-wide">GARUDAKSHAK</span>
              <div className="text-gray-400 text-xs tracking-wide">SECURING SKIES, DEFENDING HORIZONS</div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide">ABOUT</a>
            <a href="#technology" className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide">TECHNOLOGY</a>
            <a href="#team" className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide">TEAM</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-left">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter leading-none">
              AIRSPACE
              <br />
              <span className="text-gray-500">DEFENSE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 font-light leading-relaxed">
              Advanced AI-powered drone detection and neutralization systems
              for critical infrastructure protection
            </p>

            <div className="flex gap-6">
              <a
                href="#contact"
                className="bg-white text-black px-10 py-3 font-medium tracking-wide hover:bg-gray-200 transition-colors text-sm"
              >
                REQUEST CONSULTATION
              </a>
              <a
                href="#technology"
                className="border border-gray-700 text-white px-10 py-3 font-medium tracking-wide hover:border-gray-500 transition-colors text-sm"
              >
                VIEW CAPABILITIES
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-5xl font-bold mb-8 tracking-tighter">ABOUT</h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
                <p>
                  Garudakshak develops autonomous drone detection and neutralization systems 
                  for defense applications, critical infrastructure protection, and airspace security.
                </p>
                <p>
                  Our technology integrates advanced RF signal processing, machine learning algorithms, 
                  and directed energy countermeasures to provide comprehensive airspace defense capabilities.
                </p>
              </div>
            </div>
            <div className="space-y-12">
              <div className="border-l-2 border-white pl-6">
                <h3 className="text-xl font-bold mb-2 tracking-wide">OBJECTIVE</h3>
                <p className="text-gray-400 text-base">Secure critical airspace through autonomous detection and neutralization systems</p>
              </div>
              <div className="border-l-2 border-gray-600 pl-6">
                <h3 className="text-xl font-bold mb-2 tracking-wide">APPLICATIONS</h3>
                <p className="text-gray-400 text-base">Military installations, airports, government facilities, power plants, data centers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center tracking-tighter">TECHNOLOGY</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group">
              <div className="border border-gray-800 p-8 h-full hover:border-gray-600 transition-all duration-500">
                <div className="text-4xl font-bold text-gray-600 mb-4">01</div>
                <h3 className="text-2xl font-bold mb-6 tracking-wider">RF DETECTION</h3>
                <p className="text-gray-400 leading-relaxed">
                  Continuous spectrum monitoring across multiple frequency bands for 
                  real-time drone detection and classification.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="border border-gray-800 p-8 h-full hover:border-gray-600 transition-all duration-500">
                <div className="text-4xl font-bold text-gray-600 mb-4">02</div>
                <h3 className="text-2xl font-bold mb-6 tracking-wider">AI TRACKING</h3>
                <p className="text-gray-400 leading-relaxed">
                  Intelligent direction finding and triangulation algorithms for 
                  precise positioning and trajectory prediction.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="border border-gray-800 p-8 h-full hover:border-gray-600 transition-all duration-500">
                <div className="text-4xl font-bold text-gray-600 mb-4">03</div>
                <h3 className="text-2xl font-bold mb-6 tracking-wider">NEUTRALIZATION</h3>
                <p className="text-gray-400 leading-relaxed">
                  Safe, high-power countermeasures for disabling drones in 
                  restricted zones without collateral damage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center tracking-tighter">CAPABILITIES</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="border-l-2 border-white pl-8">
                <h3 className="text-2xl font-bold mb-4 tracking-wider">REAL-TIME DETECTION</h3>
                <p className="text-gray-400 leading-relaxed">
                  Immediate awareness and classification of drone activity within protected airspace zones.
                </p>
              </div>
              
              <div className="border-l-2 border-gray-600 pl-8">
                <h3 className="text-2xl font-bold mb-4 tracking-wider">CIVILIAN-SAFE</h3>
                <p className="text-gray-400 leading-relaxed">
                  Non-destructive neutralization methods minimize risks to people and property.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="border-l-2 border-gray-600 pl-8">
                <h3 className="text-2xl font-bold mb-4 tracking-wider">AI-POWERED</h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced machine learning algorithms reduce human supervision and response time.
                </p>
              </div>
              
              <div className="border-l-2 border-white pl-8">
                <h3 className="text-2xl font-bold mb-4 tracking-wider">SCALABLE</h3>
                <p className="text-gray-400 leading-relaxed">
                  Modular system architecture adapts to various deployment scenarios and requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center tracking-tighter">TEAM</h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(teamMembers.length / 3) }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-3 gap-12">
                      {teamMembers.slice(slideIndex * 3, (slideIndex + 1) * 3).map((member, index) => (
                        <div key={index} className="text-center group">
                          <div className="mb-6 relative">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-32 h-32 mx-auto object-cover border border-gray-800 group-hover:border-gray-600 transition-all duration-500"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjMTExMTExIi8+CjxjaXJjbGUgY3g9IjY0IiBjeT0iNDgiIHI9IjE2IiBmaWxsPSIjNkI3MjgwIi8+CjxwYXRoIGQ9Ik00MCA5NkM0MCA4Ny4xNjMzIDQ3LjE2MzMgODAgNTYgODBINzJDODAuODM2NyA4MCA4OCA4Ny4xNjMzIDg4IDk2VjEwNEg0MFY5NloiIGZpbGw9IiM2QjcyODAiLz4KPC9zdmc+';
                              }}
                            />
                          </div>
                          <h3 className="text-xl font-bold mb-2 tracking-wider">{member.name}</h3>
                          <p className="text-gray-400 font-light tracking-wide">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12">
              <button
                onClick={prevSlide}
                className="border border-gray-800 p-3 hover:border-gray-600 hover:bg-gray-900 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(teamMembers.length / 3) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-12 h-1 transition-all duration-300 ${
                      currentSlide === index ? 'bg-white' : 'bg-gray-800 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="border border-gray-800 p-3 hover:border-gray-600 hover:bg-gray-900 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 tracking-tighter">CONTACT</h2>
          <p className="text-xl text-gray-400 mb-16 leading-relaxed font-light">
            For inquiries regarding system specifications, deployment requirements, 
            or technical consultations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
            <a
              href="mailto:Saransh@garudakshak.com"
              className="bg-white text-black px-10 py-4 font-medium tracking-wide hover:bg-gray-200 transition-colors text-sm text-center"
            >
              EMAIL INQUIRY
            </a>
            <a
              href="tel:+918209706419"
              className="border border-gray-700 text-white px-10 py-4 font-medium tracking-wide hover:border-gray-500 transition-colors text-sm text-center"
            >
              TECHNICAL SUPPORT
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-gray-500 text-sm font-mono tracking-wider text-center">
            © {new Date().getFullYear()} GARUDAKSHAK. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );

}