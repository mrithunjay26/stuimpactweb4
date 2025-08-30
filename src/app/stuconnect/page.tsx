"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Link from "next/link"
import Image from "next/image"
import {
  Menu,
  X,
  ArrowRight,
  Users,
  ChevronRight,
  Target,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Rocket,
  BarChart3,
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

export default function StuConnect() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const headerRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: [] as string[],
  })

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        interests: [...formData.interests, value],
      })
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((interest) => interest !== value),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    alert("Thanks for your interest! We'll be in touch soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      interests: [],
    })
  }

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
            <img src="/stuimpactt.png" alt="StuImpact Logo" className="h-10 relative z-10" />
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                StuConnect
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-6 max-w-3xl mx-auto">
              The{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Revolutionary
              </span>{" "}
              Marketing Internship Program
            </p>
            <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              Complete professional marketing certification with our authorized partners, then join the StuImpact team
              to market revolutionary platforms like <span className="font-bold text-blue-600">ClubSync</span> and
              create measurable impact in student communities nationwide.
            </p>

            <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 rounded-3xl overflow-hidden mb-12">
              <Image
                src="/marketing.png?height=400&width=1000"
                alt="Students working as marketing interns"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-xl md:text-2xl font-bold">Rolling Admissions</p>
                <p className="text-white/80">Apply anytime - Start your marketing career today!</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfdriz7xYjnttbtpVCzcXIJo4B7mtljRf3lBo5SLYQba48Otw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group">
                  <span className="relative z-10 flex items-center">
                    Apply for Internship
                    <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                </button>
              </a>

              <a href="#program-pathway">
                <button className="px-8 py-4 rounded-full bg-white text-slate-800 border border-slate-200 font-medium hover:bg-slate-50 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300 relative group">
                  <span className="relative z-10 flex items-center">
                    See Program Pathway
                    <ChevronRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Revolutionary Impact Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Why StuConnect is Revolutionary
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Certified Professional Training",
                  description:
                    "Complete rigorous marketing certification with our authorized partner organizations, earning credentials that authenticate your expertise with quantifiable impact metrics.",
                  icon: GraduationCap,
                  color: "from-cyan-400 to-blue-500",
                },
                {
                  title: "Real StuImpact Team Position",
                  description:
                    "Upon certification, join our official marketing team to promote ClubSync and other revolutionary platforms, gaining authentic professional experience.",
                  icon: Briefcase,
                  color: "from-blue-400 to-indigo-500",
                },
                {
                  title: "Measurable Impact Documentation",
                  description:
                    "Every campaign you run generates quantifiable results that are documented in your certification, proving your real-world marketing effectiveness.",
                  icon: BarChart3,
                  color: "from-indigo-400 to-violet-500",
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

        {/* Program Pathway Section */}
        <section
          id="program-pathway"
          className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <h3 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                    Your Path to Marketing Excellence
                  </h3>

                  <p className="text-center text-slate-600 mb-10">
                    A revolutionary 3-step pathway from student to certified marketing professional on the StuImpact
                    team.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="bg-gradient-to-b from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20 rounded-bl-full"></div>
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                          1
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-cyan-700 text-center">Professional Training</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                          <span>Complete certified marketing course with authorized partners</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                          <span>Learn digital marketing, analytics, and campaign strategy</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                          <span>Pass comprehensive certification exam</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-b from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 relative overflow-hidden transform scale-105 shadow-lg">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-400 opacity-20 rounded-bl-full"></div>
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                          2
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-purple-700 text-center">StuImpact Integration</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>Join official StuImpact marketing team</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>Receive ClubSync and program training</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>Access professional marketing tools</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-b from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 opacity-20 rounded-bl-full"></div>
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                          3
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-pink-700 text-center">Impact & Growth</h4>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Execute real marketing campaigns</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Track quantifiable impact metrics</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Build portfolio of proven results</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                    <div className="mr-4 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-indigo-800">Rolling Admissions Program</p>
                      <p className="text-indigo-600">
                        Apply anytime throughout the year. Start your certification training immediately upon
                        acceptance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ClubSync Marketing Focus */}
        <section id="clubsync-focus" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Marketing Revolutionary Platforms
              </span>
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-3xl shadow-xl text-white relative overflow-hidden mb-12">
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
                  <h3 className="text-3xl font-bold mb-6 text-center">ClubSync: The Future of Student Connection</h3>
                  <p className="text-xl text-white/90 mb-6 text-center">
                    After months of intensive development by our StuImpact team, we're proud to introduce the platform
                    that will revolutionize how Washington's students connect, collaborate, and create lasting impact.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold mb-4 flex items-center">
                      <Target className="w-6 h-6 mr-2" />
                      Our Mission
                    </h4>
                    <p className="text-white/90">
                      To create an intuitive, powerful platform that connects schools and students' lives in ways never
                      before possible — fostering collaboration, leadership development, and community impact across
                      Washington state.
                    </p>
                  </div>

                  <p className="text-center text-white/90">
                    As a StuConnect marketing intern, you'll be at the forefront of introducing this revolutionary
                    platform to student communities nationwide.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect">
                  <div className="bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-xl p-4 inline-block mb-6">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-600">Quantifiable Impact Tracking</h3>
                  <p className="text-slate-600">
                    Every marketing campaign you execute is tracked with precise metrics: student engagement rates,
                    platform adoption, community growth, and measurable outcomes that are documented in your
                    certification.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect">
                  <div className="bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-xl p-4 inline-block mb-6">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-600">Multi-Platform Marketing</h3>
                  <p className="text-slate-600">
                    Beyond ClubSync, you'll help market our entire ecosystem of student programs, competitions, and
                    initiatives, gaining diverse experience across multiple target audiences and campaign types.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Now Section */}
        <section id="join-now" className="py-24 relative overflow-hidden">
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
                  <h3 className="text-3xl font-bold mb-6 text-center">Ready to Launch Your Marketing Career?</h3>
                  <p className="text-xl text-white/90 mb-10 text-center max-w-2xl mx-auto">
                    Join the revolutionary StuConnect program and become a certified marketing professional while making
                    real impact in student communities.
                  </p>

                  <div className="flex justify-center">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfdriz7xYjnttbtpVCzcXIJo4B7mtljRf3lBo5SLYQba48Otw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-medium hover:bg-white/90 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Apply Now - Rolling Admissions
                          <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Marketing Intern Success Stories
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alec Freeman",
                  role: "Digital Marketing Specialist",
                  testimonial:
                    "The StuConnect program transformed me from a student into a certified marketing professional. I've helped launch ClubSync to over 500 students and my impact metrics are documented in my certification!",
                  color: "from-cyan-400 to-blue-500",
                  impact: "500+ student signups",
                },
                {
                  name: "Sophia Kalis",
                  role: "Campaign Marketing Manager",
                  testimonial:
                    "Working as a real StuImpact team member while still in high school has been incredible. My ClubSync marketing campaigns achieved 85% engagement rates - results that are now part of my professional portfolio.",
                  color: "from-purple-400 to-pink-500",
                  impact: "85% engagement rate",
                },
                {
                  name: "Ignacio Iglesias",
                  role: "Community Outreach Coordinator",
                  testimonial:
                    "The certified training prepared me perfectly for real marketing work. I've successfully marketed 3 different StuImpact programs and my quantifiable results helped me get into my dream college!",
                  color: "from-amber-400 to-red-500",
                  impact: "3 successful campaigns",
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
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg mr-4`}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className={`text-sm bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <p className="text-sm font-medium text-green-700">Quantifiable Impact:</p>
                      <p className="text-green-600 font-bold">{item.impact}</p>
                    </div>

                    <p className="text-slate-600 italic">"{item.testimonial}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Frequently Asked Questions
              </span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How does the certification training work?",
                  answer:
                    "You'll complete a comprehensive marketing certification program with our authorized partner organizations. This includes digital marketing fundamentals, analytics, campaign strategy, and hands-on projects. Upon passing the certification exam, you'll join the StuImpact marketing team.",
                },
                {
                  question: "What makes this different from other marketing programs?",
                  answer:
                    "StuConnect is revolutionary because it combines professional certification with real internship experience. You're not just learning theory - you're immediately applying your skills as an official StuImpact team member, marketing actual platforms like ClubSync to real student communities.",
                },
                {
                  question: "How are my marketing results documented?",
                  answer:
                    "Every campaign you run generates quantifiable metrics: engagement rates, conversion numbers, reach statistics, and community impact measurements. These results are officially documented in your certification, creating a portfolio of proven marketing effectiveness.",
                },
                {
                  question: "Can I apply anytime during the year?",
                  answer:
                    "Yes! StuConnect operates on rolling admissions. You can apply anytime and begin your certification training immediately upon acceptance. There are no fixed start dates - we accommodate your schedule.",
                },
                {
                  question: "What programs will I help market besides ClubSync?",
                  answer:
                    "As a StuImpact marketing team member, you'll help promote our entire ecosystem of student programs including competitions, leadership initiatives, community service projects, and new platform launches. This gives you diverse experience across multiple target audiences.",
                },
                {
                  question: "How valuable is this for college applications and careers?",
                  answer:
                    "Extremely valuable! You'll have professional marketing certification, documented quantifiable results, real internship experience, and a portfolio of successful campaigns. This combination of credentials and proven impact sets you apart from other applicants significantly.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100"
                >
                  <h3 className="font-bold text-lg mb-3 text-slate-800">{item.question}</h3>
                  <p className="text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
