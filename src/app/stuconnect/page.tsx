"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Link from "next/link"
import Image from "next/image"
import {
    Menu,
    X,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Heart,
    Sparkles,
    Star,
    Users,
    Award,
    ChevronRight,
    Gift,
    Trophy,
    Zap,
    Megaphone,
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
                            The <span className="font-bold">BEST</span> marketing opportunity for high school students
                        </p>
                        <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
                            Earn a real marketing certification, build your resume, and gain valuable experience by simply referring
                            students to StuImpact's programs.
                        </p>

                        <div className="relative w-full max-w-3xl mx-auto h-64 md:h-80 rounded-3xl overflow-hidden mb-12">
                            <Image
                                src="/placeholder.svg?height=400&width=1000"
                                alt="Students collaborating on marketing"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <p className="text-xl md:text-2xl font-bold">Limited Time Opportunity</p>
                                <p className="text-white/80">Referral period ends July 20th - Start now!</p>
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
                    Sign Up Now
                    <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                                </button>
                            </a>

                            <a href="#certification-levels">
                                <button className="px-8 py-4 rounded-full bg-white text-slate-800 border border-slate-200 font-medium hover:bg-slate-50 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300 relative group">
                  <span className="relative z-10 flex items-center">
                    See Certification Levels
                    <ChevronRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* What We're Looking For Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Why This Is Perfect For High School Students
              </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Real Marketing Experience",
                                    description:
                                        "Add legitimate marketing experience to your resume and college applications that sets you apart from other students.",
                                    icon: Award,
                                    color: "from-cyan-400 to-blue-500",
                                },
                                {
                                    title: "Simple & Flexible",
                                    description:
                                        "No training required - just share information about StuImpact programs with your network and track your referrals.",
                                    icon: Zap,
                                    color: "from-blue-400 to-indigo-500",
                                },
                                {
                                    title: "Valuable Certification",
                                    description:
                                        "Earn a recognized marketing certification that demonstrates your communication and persuasion skills.",
                                    icon: Trophy,
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

                {/* How It Works Section */}

                <section
                    id="certification-levels"
                    className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50"
                >
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect overflow-hidden">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative">
                                    <h3 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                                        Certification Levels
                                    </h3>

                                    <p className="text-center text-slate-600 mb-10">
                                        The more students you refer, the better your certification and rewards. All referrals must be
                                        completed by July 20th.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                        <div className="bg-gradient-to-b from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20 rounded-bl-full"></div>
                                            <h4 className="text-xl font-bold mb-2 text-cyan-700">Bronze Level</h4>
                                            <div className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                                                20+ Referrals
                                            </div>
                                            <ul className="space-y-2 text-slate-600">
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                                    <span>Basic Marketing Certificate</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                                    <span>Social Media Shoutout</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                                                    <span>StuImpact Digital Badge</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-gradient-to-b from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 relative overflow-hidden transform scale-105 shadow-lg">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-400 opacity-20 rounded-bl-full"></div>
                                            <div className="absolute top-2 left-0 w-full text-center">
                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          MOST POPULAR
                        </span>
                                            </div>
                                            <h4 className="text-xl font-bold mb-2 mt-6 text-purple-700">Silver Level</h4>
                                            <div className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                                                100+ Referrals
                                            </div>
                                            <ul className="space-y-2 text-slate-600">
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                                    <span>Advanced Marketing Certificate</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                                    <span>Featured Spotlight Story</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                                    <span>Exclusive ClubSync Access</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                                    <span>Letter of Recommendation</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-gradient-to-b from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-100 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 opacity-20 rounded-bl-full"></div>
                                            <h4 className="text-xl font-bold mb-2 text-pink-700">Gold Level</h4>
                                            <div className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                                                500+ Referrals
                                            </div>
                                            <ul className="space-y-2 text-slate-600">
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                                    <span>Elite Marketing Certificate</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                                    <span>Leadership Position Opportunity</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                                    <span>Premium Event Access</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                                    <span>Personalized Mentorship</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <ChevronRight className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                                                    <span>College Application Support</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                        <div className="mr-4 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-indigo-800">Limited Time Opportunity</p>
                                            <p className="text-indigo-600">
                                                Referral period ends July 20th. Your unique referral code tracks all your contributions
                                                automatically.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Incentives Section */}
                <section id="incentives" className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Volunteer Incentives
              </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Marketing Certification",
                                    description:
                                        "Earn a professional marketing certification that validates your skills and experience for your resume.",
                                    icon: Award,
                                    color: "from-amber-400 to-orange-500",
                                },
                                {
                                    title: "Public Shoutouts",
                                    description:
                                        "Get recognized for your contributions through our social media channels and community newsletters.",
                                    icon: Megaphone,
                                    color: "from-orange-400 to-red-500",
                                },
                                {
                                    title: "Spotlight Stories",
                                    description:
                                        "Be featured in our spotlight stories on StuImpact's website, blogs, newsletters, and social media.",
                                    icon: Star,
                                    color: "from-red-400 to-pink-500",
                                },
                                {
                                    title: "Exclusive Access",
                                    description:
                                        "Gain early access to the latest events and premium features on our ClubSync platform upon release.",
                                    icon: Gift,
                                    color: "from-pink-400 to-purple-500",
                                },
                                {
                                    title: "Leadership Opportunities",
                                    description:
                                        "Stand out as a top contributor and qualify for leadership positions within StuImpact's programs.",
                                    icon: Trophy,
                                    color: "from-purple-400 to-indigo-500",
                                },
                                {
                                    title: "Networking Connections",
                                    description:
                                        "Connect with professionals and like-minded peers in our growing network of change-makers.",
                                    icon: Users,
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
                                    <h3 className="text-3xl font-bold mb-6 text-center">Ready to Start Your Marketing Journey?</h3>
                                    <p className="text-xl text-white/90 mb-10 text-center max-w-2xl mx-auto">
                                        Sign up now to get your unique referral code and start earning your marketing certification.
                                        Remember, you only have until July 20th!
                                    </p>

                                    <div className="flex justify-center">
                                        <a
                                            href="https://docs.google.com/forms/d/e/1FAIpQLSfdriz7xYjnttbtpVCzcXIJo4B7mtljRf3lBo5SLYQba48Otw/viewform"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-medium hover:bg-white/90 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Sign Up Now
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
                Volunteer Success Stories
              </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Alex Johnson",
                                    role: "Cold Calling Volunteer",
                                    testimonial:
                                        "Being part of StuConnect has given me incredible communication skills. I've helped bring 15 new students to the TecBiz Competition, and the marketing certification I earned helped me land an internship!",
                                    color: "from-cyan-400 to-blue-500",
                                },
                                {
                                    name: "Sophia Davis",
                                    role: "Email Marketing Volunteer",
                                    testimonial:
                                        "I've always been interested in digital marketing, and StuConnect gave me real-world experience. My spotlight story was featured on StuImpact's social media, which was an amazing recognition of my work.",
                                    color: "from-purple-400 to-pink-500",
                                },
                                {
                                    name: "Ethan Cho",
                                    role: "On-the-Ground Marketing",
                                    testimonial:
                                        "Representing StuImpact at school events has built my confidence and leadership skills. The exclusive access to ClubSync's premium features has also been incredibly helpful for organizing my own club activities.",
                                    color: "from-amber-400 to-red-500",
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
                                    question: "How exactly does the referral system work?",
                                    answer:
                                        "When you sign up, you'll receive a unique referral code. Share this code with students you refer to StuImpact programs. When they sign up, they'll enter your code, and you'll get credit for the referral. It's that simple!",
                                },
                                {
                                    question: "Do I need any prior marketing experience?",
                                    answer:
                                        "Not at all! This opportunity is perfect for beginners. You'll learn marketing skills through hands-on experience as you promote StuImpact's programs to your network.",
                                },
                                {
                                    question: "Can I refer students from other schools?",
                                    answer:
                                        "Absolutely! You can refer any high school or middle school student to StuImpact programs. The more students you refer, the higher certification level you can achieve.",
                                },
                                {
                                    question: "What happens after July 20th?",
                                    answer:
                                        "After July 20th, we'll tally all referrals and award certifications based on your achievement level. You'll receive your digital certificate and any additional rewards you've earned.",
                                },
                                {
                                    question: "How valuable is this certification for college applications?",
                                    answer:
                                        "Very valuable! Colleges look for students with initiative and real-world experience. This certification demonstrates your marketing skills, leadership, and ability to influence others - all highly desirable traits for college admissions.",
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

            <footer className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-16 relative overflow-hidden border-t border-slate-100">
                <GlowingOrb className="w-[400px] h-[400px] bottom-0 left-0 bg-blue-400/20" />
                <GlowingOrb className="w-[300px] h-[300px] top-0 right-0 bg-pink-400/20" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-12">
                        <div className="mb-8 md:mb-0">
                            <div className="relative group inline-block">
                                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                                <img src="/stuimpactt.png" alt="StuImpact Logo" className="h-10 mb-4 relative z-10" />
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
