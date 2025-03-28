"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Handshake,
  ArrowRight,
  Heart,
  Sparkles,
  Star,
  Users,
  Award,
  Briefcase,
  ChevronRight,
} from "lucide-react"

// Dynamic animated background elements
const GlowingOrb = ({ className }: { className?: string }) => (
    <div className={`absolute rounded-full blur-3xl animate-pulse ${className}`} />
)

const FloatingParticle = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
    <div className={`absolute rounded-full w-2 h-2 animate-float ${className}`} style={{ animationDelay: `${delay}s` }} />
)

const GlowingStreak = ({
                         className,
                         duration = 15,
                         delay = 0,
                       }: { className?: string; duration?: number; delay?: number }) => (
    <div
        className={`absolute h-[1px] blur-sm ${className}`}
        style={{
          animation: `moveAcross ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
    />
)

const PulsatingCircle = ({ className }: { className?: string }) => (
    <div className={`absolute rounded-full animate-ripple ${className}`} />
)

export default function Nonprofits() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const headerRef = useRef<HTMLElement>(null)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-rose-50 text-slate-800 overflow-x-hidden relative">
        <style jsx global>{`
        @keyframes moveAcross {
          0% {
            transform: translateX(-100%) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(200vw) translateY(20vh);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-ripple {
          animation: ripple 5s ease-in-out infinite;
        }
        
        .card-hover-effect {
          transition: all 0.3s ease;
        }
        
        .card-hover-effect:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
        }
        
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

        {/* Dynamic background elements */}
        <GlowingOrb className="w-[800px] h-[800px] -top-[400px] -left-[400px] bg-blue-400/20" />
        <GlowingOrb className="w-[600px] h-[600px] top-[30%] -right-[300px] bg-purple-400/20" />
        <GlowingOrb className="w-[500px] h-[500px] bottom-[10%] left-[10%] bg-pink-400/20" />

        {/* Glowing streaks that move across the screen */}
        <GlowingStreak className="w-[300px] top-[15%] bg-gradient-to-r from-cyan-500 to-blue-500" duration={20} />
        <GlowingStreak
            className="w-[200px] top-[35%] bg-gradient-to-r from-purple-500 to-pink-500"
            duration={15}
            delay={2}
        />
        <GlowingStreak
            className="w-[250px] top-[55%] bg-gradient-to-r from-amber-500 to-pink-500"
            duration={18}
            delay={5}
        />
        <GlowingStreak
            className="w-[350px] top-[75%] bg-gradient-to-r from-emerald-500 to-cyan-500"
            duration={22}
            delay={8}
        />

        {/* Floating particles */}
        <FloatingParticle className="top-[20%] left-[10%] bg-blue-400" />
        <FloatingParticle className="top-[40%] left-[80%] bg-purple-400" delay={3} />
        <FloatingParticle className="top-[60%] left-[30%] bg-pink-400" delay={6} />
        <FloatingParticle className="top-[80%] left-[60%] bg-amber-400" delay={9} />
        <FloatingParticle className="top-[30%] left-[50%] bg-emerald-400" delay={12} />

        {/* Pulsating circles */}
        <PulsatingCircle className="w-32 h-32 top-[25%] left-[20%] border border-blue-300/30" />
        <PulsatingCircle className="w-40 h-40 top-[45%] right-[15%] border border-purple-300/30" />
        <PulsatingCircle className="w-36 h-36 bottom-[20%] left-[40%] border border-pink-300/30" />

        {/* Mouse follower effect */}
        <div
            className="fixed w-40 h-40 rounded-full bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 blur-xl pointer-events-none z-10 transition-all duration-300 ease-out"
            style={{
              left: `${mousePosition.x - 80}px`,
              top: `${mousePosition.y - 80}px`,
            }}
        />

        <header
            ref={headerRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
            }`}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold relative group">
              <img src="stuimpactt.png" alt="StuImpact Logo" className="h-10 relative z-10" />
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {[
                { name: "Our Mission", href: "/#our-mission" },
                { name: "Opportunities", href: "/opportunities" },
                { name: "Our Team", href: "/team" },
                { name: "Partner With Us", href: "/nonprofits" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors relative group overflow-hidden"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                  </Link>
              ))}
            </nav>

            <button
                onClick={toggleMenu}
                className="md:hidden text-slate-600 hover:text-purple-600 transition-colors z-10 relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {menuOpen ? <X className="h-6 w-6 relative z-10" /> : <Menu className="h-6 w-6 relative z-10" />}
            </button>
          </div>
        </header>

        {menuOpen && (
            <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/95 via-white/95 to-rose-50/95 backdrop-blur-md z-40 md:hidden">
              <div className="container mx-auto px-4 py-20">
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-slate-600 hover:text-purple-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <nav className="flex flex-col space-y-8">
                  {[
                    { name: "Our Mission", href: "/" },
                    { name: "What We Do", href: "/#services" },
                    { name: "Nonprofits", href: "/nonprofits" },
                    { name: "Our Team", href: "/team" },
                    { name: "Contact", href: "/contact" },
                  ].map((item) => (
                      <Link
                          key={item.name}
                          href={item.href}
                          className="text-xl font-medium relative group"
                          onClick={toggleMenu}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                  ))}
                </nav>
              </div>
            </div>
        )}

        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Nonprofit Partnership
                </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
                  Join forces with StuImpact to create meaningful impact through collaborative initiatives that empower
                  students and strengthen communities.
                </p>

                <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 rounded-3xl overflow-hidden mb-12">
                  <Image
                      src="/community.jpg?height=400&width=1000"
                      alt="Nonprofit collaboration"
                      fill
                      className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-xl md:text-2xl font-bold">Building bridges between students and nonprofits</p>
                    <p className="text-white/80">Creating win-win partnerships that drive positive change</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="#what-we-provide">
                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group">
                    <span className="relative z-10 flex items-center">
                      Explore Partnership Benefits
                      <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                    </button>
                  </Link>

                  <Link href="/contact">
                    <button className="px-8 py-4 rounded-full bg-white text-slate-800 border border-slate-200 font-medium hover:bg-slate-50 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300 relative group">
                    <span className="relative z-10 flex items-center">
                      Contact Us
                      <ChevronRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* What We Provide Section */}
          <section id="what-we-provide" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                What We Provide
              </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Co-Branding Opportunities",
                    description:
                        "Joint branding on events and promotional materials to enhance visibility and credibility for both organizations.",
                    icon: Handshake,
                    color: "from-cyan-400 to-blue-500",
                  },
                  {
                    title: "Student Network Access",
                    description:
                        "Connect with a network of motivated students for volunteering, internships, and other collaborative opportunities.",
                    icon: Users,
                    color: "from-blue-400 to-indigo-500",
                  },
                  {
                    title: "Social Media Collaboration",
                    description:
                        "Collaborate on social media campaigns to boost awareness and engagement for both organizations.",
                    icon: Sparkles,
                    color: "from-indigo-400 to-violet-500",
                  },
                  {
                    title: "Marketing Support",
                    description:
                        "Amplify your nonprofit's reach through our established channels, including social media, newsletters, and community events.",
                    icon: Star,
                    color: "from-violet-400 to-purple-500",
                  },
                  {
                    title: "Event Sponsorship",
                    description:
                        "Support and sponsor events such as hackathons and workshops, increasing engagement and impact.",
                    icon: Award,
                    color: "from-purple-400 to-pink-500",
                  },
                  {
                    title: "Teaching Platform Access",
                    description:
                        "Provide access to our customizable teaching platform to support your educational initiatives and remote classes.",
                    icon: Briefcase,
                    color: "from-pink-400 to-rose-500",
                  },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect relative group"
                    >
                      <div
                          className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-[1rem] blur-sm transition-opacity duration-500 z-0"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${item.color.split(" ")[0].replace("from-", "")}, ${item.color.split(" ")[1].replace("to-", "")})`,
                          }}
                      ></div>

                      <div className="relative z-10">
                        <div
                            className={`bg-gradient-to-br ${item.color.replace("from-", "from-").replace("to-", "to-")}/10 rounded-xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className={`w-8 h-8 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`} />
                        </div>

                        <h3
                            className={`text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.color} transition-colors`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-slate-600">{item.description}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnership Showcase */}
          <section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative">
                    <div className="flex flex-col md:flex-row gap-8 mb-10">
                      <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                          Success Through Partnership
                        </h3>

                        <p className="text-lg text-slate-600 mb-6">
                          Our collaborative approach creates meaningful impact by combining your nonprofit's expertise
                          with our student network and resources. Together, we can amplify each other's missions and
                          create lasting change in our communities.
                        </p>

                        <p className="text-lg text-slate-600 mb-6">
                          From co-branded events to shared resources, our partnerships are designed to be mutually
                          beneficial while maximizing positive impact for all stakeholders.
                        </p>

                        <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-6">
                          <div className="mr-4 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-indigo-800">Student Engagement</p>
                            <p className="text-indigo-600">800+ students reached through our partnerships</p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden h-64 md:h-full">
                          <Image
                              src="/dramaclub.jpg?height=400&width=600"
                              alt="Partnership in action"
                              fill
                              className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* In Return Section */}
          <section id="in-return" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">In Return</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Expertise Sharing",
                    description:
                        "Offer valuable insights and knowledge in your field to enhance our educational resources and programs.",
                    icon: Briefcase,
                    color: "from-amber-400 to-orange-500",
                  },
                  {
                    title: "Curriculum Development",
                    description:
                        "Contribute to or help shape curriculum and educational content that aligns with both organizations' missions.",
                    icon: Award,
                    color: "from-orange-400 to-red-500",
                  },
                  {
                    title: "Social Media Promotion",
                    description:
                        "Promote StuImpact's initiatives through your social media channels to increase visibility and engagement.",
                    icon: Sparkles,
                    color: "from-red-400 to-pink-500",
                  },
                  {
                    title: "Professional Networking",
                    description:
                        "Introduce us to your network of professionals and partners for potential collaborations and expanded opportunities.",
                    icon: Users,
                    color: "from-pink-400 to-purple-500",
                  },
                  {
                    title: "Event Participation",
                    description:
                        "Actively participate in co-branded events and workshops, contributing your expertise and resources to maximize impact.",
                    icon: Handshake,
                    color: "from-purple-400 to-indigo-500",
                  },
                  {
                    title: "Mentorship and Guidance",
                    description:
                        "Provide mentorship and guidance to students and staff, sharing your experience to help them achieve their goals.",
                    icon: Star,
                    color: "from-indigo-400 to-cyan-500",
                  },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect relative group"
                    >
                      <div
                          className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-[1rem] blur-sm transition-opacity duration-500 z-0"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${item.color.split(" ")[0].replace("from-", "")}, ${item.color.split(" ")[1].replace("to-", "")})`,
                          }}
                      ></div>

                      <div className="relative z-10">
                        <div
                            className={`bg-gradient-to-br ${item.color.replace("from-", "from-").replace("to-", "to-")}/10 rounded-xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className={`w-8 h-8 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`} />
                        </div>

                        <h3
                            className={`text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.color} transition-colors`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-slate-600">{item.description}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden opacity-20">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white/30 blur-sm"
                            style={{
                              width: `${Math.random() * 4 + 1}px`,
                              height: `${Math.random() * 4 + 1}px`,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                              animationDelay: `${Math.random() * 10}s`,
                            }}
                        />
                    ))}
                  </div>

                  <div className="relative">
                    <h3 className="text-3xl font-bold mb-6 text-center">Ready to Partner with StuImpact?</h3>
                    <p className="text-xl text-white/90 mb-10 text-center max-w-2xl mx-auto">
                      Join our growing network of nonprofit partners and create meaningful impact together. Let's combine
                      our strengths to empower students and strengthen communities.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                      <Link href="/contact">
                        <button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-medium hover:bg-white/90 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Get in Touch
                          <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        </button>
                      </Link>

                      <Link href="/#success-stories">
                        <button className="px-8 py-4 rounded-full bg-transparent text-white border border-white/30 font-medium hover:bg-white/10 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          View Success Stories
                          <ChevronRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-16 relative overflow-hidden border-t border-slate-100">
          <GlowingOrb className="w-[400px] h-[400px] bottom-0 left-0 bg-blue-400/20" />
          <GlowingOrb className="w-[300px] h-[300px] top-0 right-0 bg-pink-400/20" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-12">
              <div className="mb-8 md:mb-0">
                <div className="relative group inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                  <img src="stuimpactt.png" alt="StuImpact Logo" className="h-10 mb-4 relative z-10" />
                </div>
                <p className="text-slate-500 max-w-md">
                  Empowering the next generation of leaders through meaningful service and community engagement.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white"
                  >
                    <Heart className="w-4 h-4" />
                  </a>
                  <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white"
                  >
                    <Sparkles className="w-4 h-4" />
                  </a>
                  <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white"
                  >
                    <Star className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold text-slate-800 mb-4">Contact Us</h4>
                  <div className="space-y-3">
                    <a
                        href="mailto:inquiries@stuimpact.works"
                        className="flex items-center text-slate-600 hover:text-purple-600 transition-colors group"
                    >
                      <div className="mr-2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-blue-200 transition-colors">
                        <Mail className="w-3 h-3 text-gradient-to-r from-cyan-500 to-blue-500" />
                      </div>
                      inquiries@stuimpact.works
                    </a>
                    <a
                        href="tel:+14253942112"
                        className="flex items-center text-slate-600 hover:text-purple-600 transition-colors group"
                    >
                      <div className="mr-2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                        <Phone className="w-3 h-3 text-gradient-to-r from-blue-500 to-purple-500" />
                      </div>
                      +1-425-394-2112
                    </a>
                    <span className="flex items-start text-slate-600 group">
                    <div className="mr-2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mt-1 flex-shrink-0">
                      <MapPin className="w-3 h-3 text-gradient-to-r from-purple-500 to-pink-500" />
                    </div>
                    2018 156th Ave NE Bellevue, WA 98007
                  </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-4">Quick Links</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Our Mission", href: "/#our-mission" },
                      { name: "Opportunities", href: "/opportunities" },
                      { name: "Our Team", href: "/team" },
                      { name: "Partner With Us", href: "/nonprofits" },
                      { name: "Contact", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block text-slate-600 hover:text-purple-600 transition-colors relative group"
                        >
                          <span className="relative z-10">{item.name}</span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-4">Legal</h4>
                  <div className="space-y-3">
                    <Link
                        href="/privacy"
                        className="block text-slate-600 hover:text-purple-600 transition-colors relative group"
                    >
                      <span className="relative z-10">Privacy Policy</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link
                        href="/terms"
                        className="block text-slate-600 hover:text-purple-600 transition-colors relative group"
                    >
                      <span className="relative z-10">Terms of Service</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-500">© 2023 StuImpact. All Rights Reserved.</p>
              <p className="text-sm text-slate-500 mt-1">501(C)3 Non-profit (EIN:61-2122338)</p>
            </div>
          </div>
        </footer>
      </div>
  )
}

