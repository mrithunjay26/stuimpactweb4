"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Menu,
  X,
  Calendar,
  Mic,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Target,
  Briefcase,
  Users,
  Award,
  Star,
  Handshake,
  ArrowRight,
  Heart,
  Sparkles,
  Quote,
  Zap,
  Trophy,
  DollarSign,
  Play,
  Smartphone,
  Globe,
  MessageSquare,
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

const BlackOverlay = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`fixed inset-0 bg-black/80 transition-opacity duration-1000 pointer-events-none z-40 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
  />
)

// Confetti component
const Confetti = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  )
}

// Counter animation component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [value, duration, isVisible])

  return <span ref={countRef}>{count}</span>
}

// Student success story component
const SuccessStory = ({
  name,
  quote,
  image,
  program,
  color = "from-purple-500 to-pink-500",
}: {
  name: string
  quote: string
  image: string
  program: string
  color?: string
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 card-hover-effect relative group overflow-hidden">
    <div
      className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-[1rem] blur-sm transition-opacity duration-500 z-0"
      style={{
        backgroundImage: `linear-gradient(to right, ${color.split(" ")[0].replace("from-", "")}, ${color.split(" ")[1].replace("to-", "")})`,
      }}
    ></div>

    <div className="relative z-10">
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
          <Image src={image || "/placeholder.PNG"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${color}`}>{name}</h3>
          <p className="text-slate-600">{program}</p>
        </div>
      </div>

      <div className="relative">
        <Quote
          className={`absolute -top-2 -left-2 w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r ${color} opacity-30`}
        />
        <p className="text-slate-700 italic pl-4">{quote}</p>
      </div>
    </div>
  </div>
)

export default function Component() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [tecBizVisible, setTecBizVisible] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const tecBizRef = useRef<HTMLDivElement>(null)

  const phrases = [
    "ClubSync is revolutionizing how student clubs connect and collaborate. 🚀",
    "From Chess Club to Drama Club - ClubSync brings them all together. 🎭",
    "Why manage clubs separately when ClubSync can unite them all? 💡",
    "ClubSync: Where every student organization finds its perfect match. ✨",
    "Leadership made seamless with ClubSync's innovative platform. 🔥",
    "ClubSync transforms club management from chaos to coordination. 💪",
    "The future of student organizations starts with ClubSync. 🌟",
    "ClubSync: Connecting clubs, creating communities, changing lives. 💫",
    "Beta testing now - ClubSync launches October 2025! 🎯",
    "ClubSync isn't just a platform - it's a movement. Join us! 🚀",
  ]

  const slides = [
    {
      title: "Leadership: Upgraded.",
      content:
        "Why settle for just one club when we empower *all* of them? From Game Design Club to Chess Club, we're here to make leaders who actually lead—and look good doing it.",
      image: "/dramaclub.jpg?height=300&width=800",
    },
    {
      title: "Volunteer Opportunities? We've Got Range.",
      content:
        "Whether it's organizing charity drives or decorating for prom, we're turning 'mandatory hours' into 'memorable moments' for every club, not just the usual suspects.",
      image: "/empowerment.jpg?height=300&width=800",
    },
    {
      title: "Hour Tracking That Doesn't Suck.",
      content:
        "No more scribbling on random papers or awkward Google Sheets. We've got a system so smooth even your club treasurer will approve.",
      image: "/volunteer.png?height=300&width=800",
    },
    {
      title: "Impact? We're Making Waves.",
      content:
        "Big events. Bigger change. Whether you're baking cookies or hosting a blood drive, we'll help you go from small fish to clubbing legends.",
      image: "/placeholder.PNG?height=300&width=800",
    },
  ]

  // Success stories data
  const successStories = [
    {
      name: "Alex Johnson",
      quote:
        "StuImpact helped me discover my passion for community service and gave me the tools to make a real difference in my neighborhood.",
      image: "/Alex.PNG?height=200&width=200",
      program: "Student Ambassador Program",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Eeshani Patel",
      quote:
        "Through the mentorship program, I connected with professionals in my dream field in bio tech and i gained valuable knowledge on the field, knowledge that's led me to numerous opportunities in labs and internships pertainng to biotech!",
      image: "/eeshani.PNG?height=200&width=200",
      program: "Mentorship Program",
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Ethan Cho",
      quote:
        "The skills I learned organizing events with the StuImpact team directly helped me land my first paid internship in high school. This organization changes lives!",
      image: "/ethan cho.PNG?height=200&width=200",
      program: "StuImpact Internship",
      color: "from-indigo-500 to-violet-500",
    },
    {
      name: "Sofia Heger",
      quote:
        "Being a Student Impact Ambassador gave me confidence in leading my club. We now aim to do 1 community event each month on cleanups, stuimpact made it much easier for us to organize these events with other clubs in the area!.",
      image: "/sofia.PNG?height=200&width=200",
      program: "Ambassador Program",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Henry Rodriguez",
      quote:
        "The WaForge Hackathon was Amazing! Our team's project is now a real startup, and we're making an impact beyond what we imagined thanks to the Catalyst program",
      image: "/rodriguez.PNG?height=200&width=200",
      program: "Waforge Competition",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Aaryan Saxena",
      quote:
        "StuImpact connected me with a nonprofit internship that was perfect for me. I gained a passion for nonprofit service and i'm currently pursuing a carreer in the sector..",
      image: "/aaryan.PNG?height=200&width=200",
      program: "Nonprofit Internship",
      color: "from-pink-500 to-rose-500",
    },
  ]

  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setOpacity(0)
      setTimeout(() => {
        // Change phrase and fade back in
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setOpacity(1)
      }, 1000) // Wait for fade-out transition
    }, 5000) // Change phrase every 5 seconds
    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Check if TecBiz section is visible
      if (tecBizRef.current) {
        const rect = tecBizRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0
        setTecBizVisible(isVisible)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoVisible(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )

    const videoSection = document.getElementById("video-section")
    if (videoSection) {
      observer.observe(videoSection)
    }

    return () => {
      if (videoSection) {
        observer.unobserve(videoSection)
      }
    }
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

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

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

				@keyframes confetti {
					0% {
						transform: translateY(-10px) translateX(0) rotate(0deg);
						opacity: 1;
					}
					100% {
						transform: translateY(100vh) translateX(calc(100px - 200px * var(0.5))) rotate(720deg);
						opacity: 0;
					}
				}

				.animate-float {
					animation: float 15s ease-in-out infinite;
				}

				.animate-ripple {
					animation: ripple 5s ease-in-out infinite;
				}

				.animate-confetti {
					animation: confetti 3s ease-in-out forwards;
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

      <BlackOverlay isVisible={isVideoVisible} />

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

      <div className={`transition-colors duration-1000 ${isVideoVisible ? "text-white" : "text-slate-800"}`}>
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
                { name: "StuConnect", href: "/stuconnect" },
			    { name: "ClubSync", href: "#clubsync" },
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
                  { name: "Our Mission", href: "/#our-mission" },
                  { name: "ClubSync", href: "#clubsync" },
                  { name: "Opportunities", href: "/opportunities" },
                  { name: "Our Team", href: "/team" },
                  { name: "Partner With Us", href: "/nonprofits" },
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
          {/* Hero Section - Removed background image, added ClubSync video promo on right */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-500 via-indigo-500 to-fuchsia-400">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-[-10%] right-1/4 w-[800px] h-[800px] bg-fuchsia-300/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-300/20 rounded-full blur-3xl"></div>
            </div>

            {/* Enhanced sparkles with more movement */}
            <div className="absolute inset-0 -z-0 pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-white/60 via-purple-200/80 to-fuchsia-200/60 blur-sm animate-pulse"
                  style={{
                    width: `${Math.random() * 6 + 3}px`,
                    height: `${Math.random() * 6 + 3}px`,
                    top: `${Math.random() * 120 - 10}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 8}s`,
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-28">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-8 animate-slide-in-left">
                  {/* StuImpact Introduction */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-purple-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-300/50">
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span className="text-purple-100 font-semibold text-sm">Introducing StuImpact</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight">
                      <span className="text-white drop-shadow-lg">Empowering</span>
                      <br />
                      <span
                        className="bg-gradient-to-r from-yellow-300 via-white to-purple-200 
    bg-clip-text text-transparent animate-pulse"
                      >
                        Student Leaders
                      </span>
                      <br />
                      <span className="text-white drop-shadow-lg">Across Washington</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-purple-50 leading-relaxed max-w-2xl">
                      From{" "}
                      <span className="font-bold text-yellow-300 bg-purple-800/30 px-2 py-1 rounded-lg">ClubSync</span>
                      connecting every student organization to
                      <span className="font-bold text-purple-200 bg-purple-800/30 px-2 py-1 rounded-lg">
                        mentorships
                      </span>
                      , internships, and{" "}
                      <span className="font-bold text-yellow-300 bg-purple-800/30 px-2 py-1 rounded-lg">
                        TechBiz 2025
                      </span>{" "}
                       - we're building the future of student opportunities.
                    </p>
                  </div>

                  {/* Navigation Buttons - Updated to use proper purple/indigo gradient scheme */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <a
                      href="#clubsync"
                      className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 
  rounded-2xl font-bold text-center hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Smartphone className="w-6 h-6" />
                        <span className="text-sm">ClubSync</span>
                        <span className="text-xs opacity-75">Platform</span>
                      </div>
                    </a>

                    <a
                      href="#success-stories"
                      className="group relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold text-center hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Award className="w-6 h-6" />
                        <span className="text-sm">Success</span>
                        <span className="text-xs opacity-75">Stories</span>
                      </div>
                    </a>

                    <a
                      href="#techbiz-competition"
                      className="group relative bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-6 py-4 rounded-2xl font-bold text-center hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Trophy className="w-6 h-6" />
                        <span className="text-sm">TechBiz</span>
                        <span className="text-xs opacity-75">2025</span>
                      </div>
                    </a>

                    <a
                      href="#services"
                      className="group relative bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-4 rounded-2xl font-bold text-center hover:shadow-2xl hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-6 h-6" />
                        <span className="text-sm">Services</span>
                        <span className="text-xs opacity-75">We Offer</span>
                      </div>
                    </a>

                    <a
                      href="/opportunities"
                      className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl font-bold text-center hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-110 transition-all duration-300 border-4 border-purple-200"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Briefcase className="w-6 h-6" />
                        <span className="text-sm">Internships</span>
                        <span className="text-xs opacity-75">& Jobs</span>
                      </div>
                    </a>

                    <a
                      href="/contact"
                      className="group relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-bold text-center hover:shadow-2xl hover:shadow-pink-500/25 hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Mail className="w-6 h-6" />
                        <span className="text-sm">Contact</span>
                        <span className="text-xs opacity-75">Us</span>
                      </div>
                    </a>
                  </div>

                  {/* TechBiz 2025 Highlight - Updated colors to match purple theme */}
                  <div className="bg-purple-800/30 backdrop-blur-sm border border-purple-300/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                      <span className="text-yellow-300 font-bold text-lg">TechBiz 2025 - December</span>
                    </div>
                    <p className="text-purple-100 text-sm leading-relaxed">
                      Join us this December for TechBiz 2025, a first-of-its-kind hackathon–business pitch hybrid
                      presented by StuImpact in partnership with{" "}
                      <span className="font-bold text-yellow-300">Google</span>. Combining fast-paced innovation with
                      DECA-style presentations—designed to empower high school students to think like both engineers and
                      entrepreneurs.
                    </p>
                  </div>

                  {/* Main CTA - Updated button colors to match theme */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://tally.so/r/wQb12Y" target="_blank" rel="noopener noreferrer">
                      <button className="group relative bg-white text-purple-600 px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-purple-500/25 hover:scale-110 transition-all duration-300 border-4 border-purple-200">
                        <span className="relative z-10 flex items-center gap-2">
                          <Zap className="w-6 h-6" />
                          Apply for ClubSync
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-purple-300 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </button>
                    </a>
                    <a
  href="https://clubsync.org"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-purple-800/50 backdrop-blur-sm text-white px-8 py-5 rounded-2xl text-lg font-semibold border-2 border-purple-300/50 hover:bg-purple-700/60 hover:scale-105 transition-all duration-300"
>
  Learn More
</a>
                  </div>
                </div>

                {/* Right Content - Dashboard Mockups - Updated dashboard colors to match purple theme */}
                <div className="relative animate-slide-in-right">
                  {/* Main Dashboard Mockup */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-200/50 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-white font-semibold ml-4">ClubSync Dashboard</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Dashboard Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h3>
                        <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-purple-700 text-sm font-medium">5 clubs active</span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
                          <div className="text-2xl font-bold text-purple-600">24</div>
                          <div className="text-sm text-purple-700">Events This Month</div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                          <div className="text-2xl font-bold text-indigo-600">156</div>
                          <div className="text-sm text-indigo-700">Active Members</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-violet-50 p-4 rounded-xl border border-blue-100">
                          <div className="text-2xl font-bold text-blue-600">89%</div>
                          <div className="text-sm text-blue-700">Attendance Rate</div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Recent Activity</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Chess Club Meeting</div>
                              <div className="text-sm text-gray-600">Tomorrow at 3:30 PM</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Drama Club Auditions</div>
                              <div className="text-sm text-gray-600">Friday at 4:00 PM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Calendar Widget */}
                  <div className="absolute -top-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200/50 p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-purple-600 mb-2">October 2024</div>
                      <div className="grid grid-cols-7 gap-1 text-xs">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                          <div key={i} className="w-6 h-6 flex items-center justify-center font-medium text-gray-500">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: 31 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 flex items-center justify-center text-xs rounded ${
                              [5, 12, 18, 25].includes(i + 1)
                                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold"
                                : "text-gray-700 hover:bg-purple-50"
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating TechBiz Notification */}
                  <div className="absolute -bottom-4 -left-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">TechBiz 2025</div>
                        <div className="text-xs opacity-90">Registration Open!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Stats Section */}
          <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
                {[
                  { number: "2", text: "Years of Experience", color: "from-cyan-400 to-blue-500" },
                  { number: "25+", text: "Team Members", color: "from-blue-400 to-indigo-500" },
                  { number: "10,000+", text: "Students Reached", color: "from-indigo-400 to-purple-500" },
                  { number: "2", text: "Nonprofit Partners", color: "from-purple-400 to-pink-500" },
                  { number: "5", text: "Programs", color: "from-pink-400 to-rose-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center border border-slate-100 card-hover-effect relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl z-0"></div>
                    <div
                      className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-[1rem] blur-sm transition-opacity duration-500 z-0"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${item.color.split(" ")[0].replace("from-", "")}, ${item.color.split(" ")[1].replace("to-", "")})`,
                      }}
                    ></div>
                    <div className="relative z-10">
                      <h3
                        className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color} mb-2`}
                      >
                        {item.number}
                      </h3>
                      <p className="text-slate-600 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section id="our-mission" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-12 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Our Mission
                </span>
              </h2>

              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto relative group card-hover-effect">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <Target className="w-10 h-10 text-gradient-to-r from-indigo-500 to-purple-500" />
                  </div>

                  <p className="text-xl text-center mx-auto text-slate-600 leading-relaxed">
                    At StuImpact, our mission is to empower the next generation of leaders by fostering a culture of
                    service, learning, and community engagement. We are dedicated to providing high school and middle
                    school students with meaningful volunteering and internship opportunities that not only enrich their
                    educational experience but also inspire a lifelong commitment to social responsibility. Through
                    StuImpact, students discover their potential to make a positive impact on the world around them.
                  </p>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative rounded-2xl overflow-hidden h-64 group">
                      <Image
                        src="/community.jpg?height=400&width=300"
                        alt="Student volunteers"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold">Volunteer Events</h3>
                        <p className="text-sm text-white/80">Making a difference together</p>
                      </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden h-64 group">
                      <Image
                        src="/empowerment.jpg?height=400&width=300"
                        alt="Leadership workshop"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold">Leadership Training</h3>
                        <p className="text-sm text-white/80">Building tomorrow's leaders</p>
                      </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden h-64 group">
                      <Image
                        src="/1652721200604.png?height=400&width=300"
                        alt="Community impact"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-bold">Community Impact</h3>
                        <p className="text-sm text-white/80">Creating lasting change</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="clubsync" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-5xl font-bold mb-16 text-center">
                <span
                  style={{
                    opacity: opacity,
                    transition: "opacity 1s ease-in-out",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundImage: "linear-gradient(to right, #0ea5e9, #8b5cf6, #ec4899)",
                    display: "inline-block",
                  }}
                >
                  {phrases[currentPhrase]}
                </span>
              </h2>

              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 mb-16 relative group card-hover-effect">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mr-4">
                          <Smartphone className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                            ClubSync Platform
                          </h3>
                          <p className="text-slate-600">Revolutionizing Student Organizations</p>
                        </div>
                      </div>

                      <p className="text-xl mb-6 text-slate-600 leading-relaxed">
                        ClubSync isn't here to just coexist with the status quo—we're here to redefine it, setting a new
                        gold standard for student leadership and community impact. Unlike traditional platforms that
                        focus on individual clubs, ClubSync creates a unified ecosystem where all student organizations
                        thrive together.
                      </p>

                      <p className="text-xl mb-6 text-slate-600 leading-relaxed">
                        Our revolutionary platform equips clubs with cutting-edge resources, from AI-powered event
                        planning and seamless collaboration tools to automated hour tracking and cross-club networking
                        opportunities that transform how student organizations operate.
                      </p>
                    </div>

                    <div className="w-full md:w-1/2">
                      <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
                            <Play className="w-12 h-12 text-purple-600 ml-1" />
                          </div>
                          <h4 className="text-2xl font-bold text-slate-800 mb-4">ClubSync Demo</h4>
                          <p className="text-slate-600 mb-6">See how ClubSync transforms club management</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/50 p-3 rounded-lg">
                              <Globe className="w-5 h-5 text-cyan-600 mb-2" />
                              <span className="text-slate-700">Unified Platform</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg">
                              <MessageSquare className="w-5 h-5 text-purple-600 mb-2" />
                              <span className="text-slate-700">Smart Communication</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg">
                              <Users className="w-5 h-5 text-pink-600 mb-2" />
                              <span className="text-slate-700">Cross-Club Events</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-lg">
                              <Trophy className="w-5 h-5 text-amber-600 mb-2" />
                              <span className="text-slate-700">Impact Tracking</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                          What ClubSync Offers
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "Unified dashboard for all club activities and communications",
                            "AI-powered event planning and resource allocation",
                            "Cross-club collaboration and networking opportunities",
                            "Automated volunteer hour tracking and verification",
                            "Real-time impact measurement and reporting",
                            "Integrated leadership development programs",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                          Benefits for Students & Clubs
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "Streamlined club management with intuitive interfaces",
                            "Enhanced collaboration between different organizations",
                            "Simplified event coordination and resource sharing",
                            "Stronger connection to meaningful volunteer opportunities",
                            "Increased visibility for college applications and scholarships",
                            "Data-driven insights for continuous improvement",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl text-white mb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-2">🚀 ClubSync Closed Beta</h3>
                        <p className="text-white/90 mb-4">
                          We're currently accepting applications from student clubs and organizations for our closed
                          beta program. Early adopters will help shape the future of student club management!
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Limited Spots</span>
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">October 2025 Launch</span>
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Free for Beta Users</span>
                        </div>
                      </div>
                      <Link href="https://tally.so/r/wQb12Y">
                        <button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-medium hover:bg-white/90 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                          <a
  href="https://tally.so/r/wQb12Y"
  className="relative z-10 flex items-center text-blue-600 hover:underline"
>
  Request Beta Access
  <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
</a>
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link href="https://clubsync.org/">
                      <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Learn More About ClubSync
                          <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ClubSync Feature Previews */}
              <div className="relative">
                <h3 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                  ClubSync Feature Previews
                </h3>

                <div className="overflow-hidden rounded-3xl shadow-xl">
                  <div
                    className="flex transition-transform ease-in-out duration-500"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {slides.map((slide, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="bg-white p-8 md:p-10">
                          <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/2 relative group">
                              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              <Image
                                src={slide.image || "/placeholder.PNG"}
                                alt={slide.title}
                                width={400}
                                height={300}
                                className="rounded-xl shadow-md w-full h-auto object-cover relative z-10"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                                {slide.title}
                              </h3>
                              <p className="text-slate-600 text-lg">{slide.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ChevronLeft className="w-6 h-6 text-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative z-10" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ChevronRight className="w-6 h-6 text-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 relative z-10" />
                </button>

                {/* Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index
                          ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                          : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* TecBiz Competition Section - Updated to December 2025 */}
          

          {/* Success Stories Section */}
          <section id="success-stories" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Student Success Stories
                </span>
              </h2>

              <div className="mb-12">
                <div className="relative rounded-3xl overflow-hidden h-96">
                  <Image
                    src="/success.jpeg?height=600&width=1200"
                    alt="Students making an impact"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white max-w-2xl">
                    <h3 className="text-3xl font-bold mb-4">Real Students. Real Impact.</h3>
                    <p className="text-xl text-white/90 mb-6">
                      Our programs have helped hundreds of students discover their potential and make meaningful
                      contributions to their communities. Here are just a few of their stories.
                    </p>
                    <div className="flex space-x-2">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        Leadership
                      </span>
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        Community Service
                      </span>
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        Personal Growth
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {successStories.map((story, index) => (
                  <SuccessStory
                    key={index}
                    name={story.name}
                    quote={story.quote}
                    image={story.image}
                    program={story.program}
                    color={story.color}
                  />
                ))}
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                        Share Your StuImpact Story
                      </h3>
                      <p className="text-slate-600 text-lg mb-6">
                        Have you been part of a StuImpact program? We'd love to hear how it impacted your life and share
                        your story with our community.
                      </p>
                      <Link href="https://forms.gle/zvmt8dCQDAg5Lp178">
                        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group">
                          <span className="relative z-10 flex items-center">
                            Submit Your Story
                            <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </button>
                      </Link>
                    </div>

                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                      <div className="relative rounded-xl overflow-hidden h-40">
                        <Image
                          src="/events.jpeg?height=200&width=200"
                          alt="Student event"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative rounded-xl overflow-hidden h-40">
                        <Image
                          src="/tecbiz.png?height=200&width=200"
                          alt="Student project"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative rounded-xl overflow-hidden h-40">
                        <Image
                          src="/volunteer.png?height=200&width=200"
                          alt="Student volunteers"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative rounded-xl overflow-hidden h-40">
                        <Image
                          src="/empowerment.jpg?height=200&width=200"
                          alt="Student leadership"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ClubSync Section - Replaced Student Impact Ambassador Portal with ClubSync focus */}
          <section id="tecbiz-competition" ref={tecBizRef} className="py-24 relative overflow-hidden">
            <Confetti isVisible={tecBizVisible} />

            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  TechBiz Competition - December 2025
                </span>
              </h2>

              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 mb-12 relative group card-hover-effect overflow-hidden">
                {/* ... existing TecBiz content with December date ... */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* TecBiz Logo */}
                <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <Image
                    src="/tecbiz.png?height=200&width=200"
                    alt="TecBiz Logo"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="w-full md:w-1/2">
                      <div className="relative rounded-2xl overflow-hidden h-64 md:h-full">
                        <Image
                          src="/tecbiz.png?height=400&width=600"
                          alt="TecBiz Competition"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-1/2">
                      <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                        The Ultimate Tech & Business Challenge
                      </h3>

                      <p className="text-xl mb-6 text-slate-600 leading-relaxed">
                        Welcome to the TechBiz Competition, where innovation meets impact! Teams of 8-10 students, led by a
                        CEO, work together to create groundbreaking software solutions and business plans that address
                        real-world challenges. <strong>Mark your calendars for December 2025!</strong>
                      </p>

                      <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                        <DollarSign className="w-10 h-10 text-green-500 mr-4" />
                        <div>
                          <p className="text-slate-700 font-medium">Funding Raised So Far</p>
                          <p className="text-3xl font-bold text-green-600">
                            $<AnimatedCounter value={3542} />
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <span className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                          Tech Innovation
                        </span>
                        <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          Business Planning
                        </span>
                        <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                          Leadership
                        </span>
                        <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                          Entrepreneurship
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ... rest of existing TecBiz content ... */}
                  <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                          What You Can Expect
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "Dynamic teams of 7 students with diverse skills and perspectives",
                            "Mentorship from industry professionals and tech entrepreneurs",
                            "Workshops on cutting-edge technologies and business strategies",
                            "Networking opportunities with potential investors and partners",
                            "Pitch your solution to a panel of industry experts and investors",
                            "Exclusive access to resources, tools, and development platforms",
                            "Winners receive a position at StuImpact and automatic admission to Catalyst",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                          Why Participate?
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "<strong>Developers:</strong> Showcase your coding skills and build a portfolio-worthy project with real-world impact.",
                            "<strong>Entrepreneurs:</strong> Transform your ideas into viable business models with expert guidance and feedback.",
                            "<strong>Designers:</strong> Create intuitive, beautiful interfaces that solve real user problems and enhance experiences.",
                            "<strong>Marketers:</strong> Craft compelling narratives and strategies to position products for success in the market.",
                            "<strong>Innovators:</strong> Collaborate with like-minded peers to push boundaries and create something truly revolutionary.",
                            "<strong>Leaders:</strong> Develop essential leadership skills by guiding your team through challenges to success.",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                              </div>
                              <div dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* ... rest of existing TecBiz content ... */}
                  <div className="bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 p-8 rounded-3xl mb-12 relative group card-hover-effect">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <Trophy className="w-8 h-8 text-amber-500 mr-3" />
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                          Catalyst Program - The Next Step
                        </h3>
                      </div>

                      <p className="text-slate-700 mb-4">
                        Winners of the TechBiz Competition gain automatic admission into Catalyst, our premier
                        accelerator program that helps student developers bring their products to market. Catalyst
                        offers comprehensive support including:
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white/50 p-4 rounded-xl">
                          <h4 className="font-bold text-purple-600 mb-2">Marketing Support</h4>
                          <p className="text-sm text-slate-600">
                            Professional branding, marketing strategy, and promotion to reach your target audience
                          </p>
                        </div>

                        <div className="bg-white/50 p-4 rounded-xl">
                          <h4 className="font-bold text-purple-600 mb-2">Financial Guidance</h4>
                          <p className="text-sm text-slate-600">
                            Business planning, financial modeling, and connections to potential investors
                          </p>
                        </div>

                        <div className="bg-white/50 p-4 rounded-xl">
                          <h4 className="font-bold text-purple-600 mb-2">Technical Resources</h4>
                          <p className="text-sm text-slate-600">
                            Development support, infrastructure, and mentorship from industry professionals
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                      {
                        icon: Users,
                        title: "Team Formation",
                        description: "Form diverse teams with complementary skills to tackle complex challenges",
                        color: "from-cyan-400 to-blue-500",
                      },
                      {
                        icon: Award,
                        title: "Pitch Competition",
                        description: "Present your solution to industry experts and potential investors",
                        color: "from-blue-400 to-purple-500",
                      },
                      {
                        icon: Briefcase,
                        title: "Career Opportunities",
                        description: "Winners receive job offers and professional development support",
                        color: "from-purple-400 to-pink-500",
                      },
                      {
                        icon: Star,
                        title: "Catalyst Program",
                        description: "Launch your product with comprehensive support and resources",
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
                            <item.icon
                              className={`w-8 h-8 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}
                            />
                          </div>

                          <h4
                            className={`text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.color} transition-colors`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl text-white">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Ready to innovate and make an impact?</h3>
                      <p className="text-white/80">Applications are open! Limited spots available!</p>
                    </div>

                    <Link href="https://luma.com/swsk67on">
                      <button className="mt-4 md:mt-0 px-8 py-4 rounded-full bg-white text-indigo-600 font-medium hover:bg-white/90 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Pre-Register Now
                          <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ... existing code for remaining sections ... */}

          {/* Services Section */}
          <section id="services" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  What We Are Doing
                </span>
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Briefcase,
                    title: "Mentor Guided Mentorships",
                    description:
                      "Connect students with professionals in STEM and other fields to inspire interest and career guidance.",
                    color: "from-cyan-400 to-blue-500",
                  },
                  {
                    icon: Users,
                    title: "Nonprofit Internships",
                    description: "Offer internships to enhance soft skills. Apply through our contact form.",
                    color: "from-blue-400 to-indigo-500",
                  },
                  {
                    icon: Award,
                    title: "Sponsoring Events/Hackathons",
                    description: "Amplify reach and inspire future leaders through event sponsorship.",
                    color: "from-indigo-400 to-violet-500",
                  },
                  {
                    icon: Handshake,
                    title: "Nonprofit Partnerships",
                    description: "Build lasting partnerships with Washington State nonprofits for community impact.",
                    color: "from-violet-400 to-purple-500",
                  },
                  {
                    icon: Smartphone,
                    title: "ClubSync Platform",
                    description: "Revolutionary platform connecting all student clubs in one unified ecosystem.",
                    color: "from-purple-400 to-fuchsia-500",
                  },
                  {
                    icon: Award,
                    title: "Semester Opportunity List",
                    description: "Receive a curated list of 250+ opportunities each semester.",
                    color: "from-fuchsia-400 to-pink-500",
                  },
                  {
                    icon: Users,
                    title: "Annual Youth Community Forum",
                    description:
                      "Students, educators, and community leaders collaborate on social issues and community projects.",
                    color: "from-pink-400 to-rose-500",
                  },
                  {
                    icon: Users,
                    title: "Company Collaborations",
                    description: "Partner with companies to create internships and career opportunities for students.",
                    color: "from-rose-400 to-red-500",
                  },
                  {
                    icon: Briefcase,
                    title: "Extracurriculars Page",
                    description:
                      "Explore internships and programs on our Extracurriculars page, offering students a variety of opportunities.",
                    color: "from-red-400 to-orange-500",
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
                          className={`bg-gradient-to-br ${item.color.replace("from-", "from-").replace("to-", "to-")}/10 rounded-xl p-4 inline-block group-hover:scale-110 transition-transform duration-300 mr-4`}
                        >
                          <item.icon
                            className={`w-8 h-8 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}
                          />
                        </div>
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

          {/* School Connections Section */}
          <section id="school-connections" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Making Schools Our Partners in Crime
                </span>{" "}
                <br />
                <span className="text-2xl font-light italic">(The Good Kind)</span>
              </h2>

              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="w-full md:w-1/2">
                      <p className="text-xl mb-6 text-slate-600 leading-relaxed">
                        We're not just here to help students—oh no, we're teaming up with school admins and counselors
                        to revolutionize opportunity access. With ClubSync and over 250 curated ways for students to
                        shine each semester, we're turning <em>potential</em> into <em>unstoppable</em>.
                      </p>
                    </div>

                    <div className="w-full md:w-1/2">
                      <div className="relative rounded-2xl overflow-hidden h-64">
                        <Image
                          src="/schoolpartner.jpg?height=400&width=600"
                          alt="School partnership"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                          Why Schools Love Us
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "ClubSync platform that unifies all student organizations in one place.",
                            "250+ handpicked opportunities every semester—no dumpster diving required.",
                            "Real, human support for admins and counselors (yes, we answer emails!).",
                            "Volunteer tracking that won't make you cry into your spreadsheets.",
                            "Co-branded events that make your school shine brighter than your rival's football team.",
                            "Leadership programs that actually develop leaders, not just club presidents on paper.",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                          Why Students Win Big
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "ClubSync makes club management actually enjoyable (shocking, we know).",
                            "Opportunities that aren't boring or irrelevant—yes, they exist.",
                            "Less time hunting for programs, more time actually doing cool stuff.",
                            "Tools and support that make personal growth look effortless (but we know the grind).",
                            "Bridging academics with real-world experiences, because theory is overrated.",
                            "Boosted college and career readiness—your future self will thank us.",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                              </div>
                              <div dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 text-center">
                    <Link href="/contact">
                      <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Let's Team Up
                          <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Our Projects
                </span>
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "ClubSync",
                    description: "Revolutionary platform for student organizations",
                    url: "#clubsync",
                    color: "from-cyan-400 to-blue-500",
                    image: "/placeholder.svg?height=200&width=300",
                  },
                  {
                    title: "UniSOP",
                    description: "Voice for overseas education",
                    url: "https://unisop.in/",
                    color: "from-blue-400 to-indigo-500",
                    image: "/unisop.PNG?height=200&width=300",
                  },
                  {
                    title: "Mentorships",
                    description: "Connecting professionals and students",
                    url: "https://jasper-rail-901.notion.site/StuImpact-Mentorships-Info-Signup-bf5f2f241a84432b8fecf0a9f5e2efbd",
                    color: "from-indigo-400 to-violet-500",
                    image: "/1652721200604.png?height=200&width=300",
                  },
                  {
                    title: "WaForge",
                    description: "Hackathon sponsorship",
                    url: "https://www.waforge.org/",
                    color: "from-violet-400 to-purple-500",
                    image: "/waforge.PNG?height=200&width=300",
                  },
                  {
                    title: "Upcoming Events",
                    description: "Community events calendar",
                    url: "https://jasper-rail-901.notion.site/Upoming-StuImpact-Events-001c76a084f34c1684f625615a8915be",
                    color: "from-purple-400 to-fuchsia-500",
                    image: "/calendar.PNG?height=200&width=300",
                  },
                  {
                    title: "Internships",
                    description: "Opportunities across Washington State",
                    url: "https://jasper-rail-901.notion.site/StuImpact-Student-Opportunities-list-8d398c5d995b4ef6b140b512c92d8b3d",
                    color: "from-fuchsia-400 to-pink-500",
                    image: "/Student-Internship.jpg?height=200&width=300",
                  },
                  {
                    title: "Education",
                    description: "Nonprofit opportunities in education",
                    url: "https://jasper-rail-901.notion.site/Stuimpact-Launches-Initiative-to-Support-Nonprofits-in-Educating-Young-Individuals-a2681718d75442cabbc3f43571a0b83f",
                    color: "from-pink-400 to-rose-500",
                    image: "/Hero-EconomicGrowth.jpg?height=200&width=300",
                  },
                ].map((project, index) => (
                  <a key={index} href={project.url} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect relative group h-full">
                      <div
                        className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-[1rem] blur-sm transition-opacity duration-500 z-0"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${project.color.split(" ")[0].replace("from-", "")}, ${project.color.split(" ")[1].replace("to-", "")})`,
                        }}
                      ></div>

                      <div className="relative z-10">
                        <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <h3
                          className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${project.color} transition-colors`}
                        >
                          {project.title}
                        </h3>
                        <p className="mb-6 text-slate-600">{project.description}</p>
                        <span
                          className={`bg-clip-text text-transparent bg-gradient-to-r ${project.color} transition-colors inline-flex items-center text-sm font-medium`}
                        >
                          Learn more{" "}
                          <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Annual Forum Section */}
          <section id="annual-forum" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Annual Youth Community Forum
                </span>
              </h2>

              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="w-full md:w-1/2">
                      <p className="text-xl mb-6 text-slate-600 leading-relaxed">
                        Welcome to the annual <strong>Student Leadership Forum</strong>, where students, educators, and
                        community leaders get together to do more than just talk. This is where real ideas take shape,
                        action plans are born, and everyone leaves feeling a little more inspired—and a lot more
                        motivated.
                      </p>
                    </div>

                    <div className="w-full md:w-1/2">
                      <div className="relative rounded-2xl overflow-hidden h-64">
                        <Image
                          src="/forum.jpg?height=400&width=600"
                          alt="Youth Community Forum"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10 mb-10">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                          What the Event Offers
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "Discussions on today's most pressing social issues",
                            "Brainstorming sessions to develop impactful initiatives",
                            "Opportunities to collaborate on community service projects",
                            "Networking with educators, leaders, and other students",
                            "Inspiring guest speakers who walk the talk",
                            "A chance to showcase your ideas and earn recognition",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl relative group card-hover-effect">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                          Who Should Join and Why
                        </h3>
                        <ul className="space-y-4 text-slate-600">
                          {[
                            "<strong>Students:</strong> Bring your ideas and passion to make a difference.",
                            "<strong>Parents/Admins:</strong> See firsthand how leadership skills develop in action.",
                            "<strong>Educators:</strong> Engage with students as they tackle real-world challenges.",
                            "Everyone leaves with actionable plans—and probably a few new friends.",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                              </div>
                              <div dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 p-8 rounded-2xl mb-10 relative group card-hover-effect">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                        Next Forum
                      </h3>
                      <p className="text-slate-700">
                        Our next Annual Youth Community Forum will take place between June and August 2025. Exact dates
                        and details will be announced soon. Stay tuned for more information!
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                      {
                        icon: Calendar,
                        title: "Event Planning - Current",
                        description: "Overseeing logistics and manage partnerships",
                        color: "from-cyan-400 to-blue-500",
                      },
                      {
                        icon: Users,
                        title: "Promotion - Soon",
                        description: "Designing visuals and managing social media",
                        color: "from-blue-400 to-purple-500",
                      },
                      {
                        icon: Mic,
                        title: "Communication - Soon",
                        description: "Handling outreach to students and schools",
                        color: "from-purple-400 to-pink-500",
                      },
                      {
                        icon: Award,
                        title: "Technology - Soon",
                        description: "Building registration and event day platforms",
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
                            <item.icon
                              className={`w-8 h-8 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}
                            />
                          </div>

                          <h4
                            className={`text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.color} transition-colors`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Link href="/contact">
                      <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Get Involved
                          <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                      </button>
                    </Link>
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
                      { name: "Our Mission", href: "#our-mission" },
                      { name: "ClubSync", href: "#clubsync" },
                      { name: "TecBiz Competition", href: "#tecbiz-competition" },
                      { name: "Success Stories", href: "#success-stories" },
                      { name: "What We Do", href: "#services" },
                      { name: "Contact", href: "#contact" },
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
    </div>
  )
}







