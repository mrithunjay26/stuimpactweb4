"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import Confetti from "react-confetti"
import { motion } from "framer-motion"
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Heart,
  Sparkles,
  Star,
  Users,
  Award,
  ChevronRight,
  Trophy,
  Zap,
  Code,
  Palette,
  Share2,
  Rocket,
  PartyPopper,
  Flame,
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

// Firework animation component
const Firework = ({ x, y, color }: { x: number; y: number; color: string }) => {
  return (
    <div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        boxShadow: `0 0 20px 5px ${color}`,
        animation: "firework 1s ease-out forwards",
      }}
    />
  )
}

// Sparkle component
const Sparkle = ({
  size,
  color,
  top,
  left,
  delay,
}: { size: number; color: string; top: number; left: number; delay: number }) => {
  return (
    <div
      className="absolute animate-sparkle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
        top: `${top}%`,
        left: `${left}%`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

// Confetti animation component
const ConfettiExplosion = ({ run }: { run: boolean }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={run ? 500 : 0}
      recycle={true}
      gravity={0.2}
      colors={["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24", "#ec4899", "#8b5cf6", "#f97316"]}
      confettiSource={{
        x: windowSize.width / 2,
        y: windowSize.height / 3,
        w: 0,
        h: 0,
      }}
    />
  )
}

export default function WelcomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const [showSparkles, setShowSparkles] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const congratsRef = useRef<HTMLHeadingElement>(null)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  // Generate random fireworks
  const generateFireworks = () => {
    const newFireworks = []
    const colors = ["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24", "#ec4899"]

    for (let i = 0; i < 10; i++) {
      newFireworks.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    setFireworks(newFireworks)

    setTimeout(() => {
      setFireworks([])
    }, 1000)
  }

  // Generate sparkles around an element
  const generateSparklesForElement = () => {
    if (congratsRef.current) {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 3000)
    }
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

  useEffect(() => {
    if (!hasAnimated) {
      // Start confetti animation immediately
      setShowConfetti(true)

      // Generate fireworks after a delay
      setTimeout(() => {
        generateFireworks()
      }, 1000)

      // Generate more fireworks periodically
      const fireworkInterval = setInterval(() => {
        generateFireworks()
      }, 2500)

      // Generate sparkles around the congratulations text
      setTimeout(() => {
        generateSparklesForElement()
      }, 500)

      // Stop confetti after 15 seconds
      setTimeout(() => {
        setShowConfetti(false)
        clearInterval(fireworkInterval)
      }, 15000)

      setHasAnimated(true)
    }
  }, [hasAnimated])

  // Generate sparkles for the congratulations text
  const sparkles = []
  for (let i = 0; i < 30; i++) {
    sparkles.push(
      <Sparkle
        key={i}
        size={Math.random() * 6 + 2}
        color={["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24", "#ec4899"][Math.floor(Math.random() * 6)]}
        top={Math.random() * 100}
        left={Math.random() * 100}
        delay={Math.random() * 3}
      />,
    )
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
        
        @keyframes firework {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(30);
            opacity: 0;
          }
        }
        
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse-rainbow {
          0%, 100% {
            background-position: 0% 50%;
            box-shadow: 0 0 20px rgba(123, 97, 255, 0.5);
          }
          50% {
            background-position: 100% 50%;
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.7);
          }
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-ripple {
          animation: ripple 5s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
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
        
        .pulse-rainbow {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: pulse-rainbow 3s ease infinite;
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

      {/* Confetti animation */}
      <ConfettiExplosion run={showConfetti} />

      {/* Fireworks */}
      {fireworks.map((fw) => (
        <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
      ))}

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
        {/* Hero Section with Congratulations */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center px-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1,
              }}
              className="relative mb-12"
            >
              <div className="relative">
                {showSparkles && sparkles}
                <h1
                  ref={congratsRef}
                  className="text-6xl md:text-8xl font-extrabold mb-6 relative z-10 animate-bounce"
                  style={{
                    textShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                  }}
                >
                  <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-yellow-500 to-green-500">
                    CONGRATULATIONS!
                  </span>
                </h1>

                {/* Decorative elements on sides of the header */}
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full md:-translate-x-1/2"
                >
                  <PartyPopper className="h-16 w-16 text-yellow-400" />
                </motion.div>

                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full md:translate-x-1/2"
                >
                  <PartyPopper className="h-16 w-16 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-2xl md:text-3xl text-slate-700 mb-6 max-w-3xl mx-auto font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  YOU'RE OFFICIALLY PART OF THE STUIMPACT FAMILY!
                </span>
              </p>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Get ready to join a{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                  dynamic team
                </span>{" "}
                that's taking over the Washington leadership scene!
              </p>
              <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
                Your journey with us begins today. Prepare to make a{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  meaningful impact
                </span>
                , develop valuable skills, and qualify for the prestigious{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                  Presidential Volunteer Service Award (PVSA)
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative w-full max-w-4xl mx-auto h-72 md:h-96 rounded-3xl overflow-hidden mb-12"
            >
              <Image
                src="/success.jpeg?height=500&width=1200"
                alt="Students collaborating on projects"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="text-2xl md:text-4xl font-bold mb-2">Your Impact Journey Starts Now!</p>
                <p className="text-xl md:text-2xl text-white/90">
                  Together, we'll create lasting change in our communities
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link href="https://join.slack.com/t/stuimpact/shared_invite/zt-26d25llme-r0yTOQNfOWH8MRaUfP2cjA">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full pulse-rainbow text-white font-bold text-lg hover:shadow-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group"
                >
                  <span className="relative z-10 flex items-center">
                    START YOUR JOURNEY NOW
                    <Rocket className="ml-2 h-6 w-6 inline group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/team">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full bg-white text-slate-800 border border-slate-200 font-bold text-lg hover:bg-slate-50 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group"
                >
                  <span className="relative z-10 flex items-center">
                    MEET YOUR TEAM
                    <ChevronRight className="ml-2 h-6 w-6 inline group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Your Impact Journey Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-yellow-500 to-green-500">
                  Your EPIC Impact Journey Begins
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Make a REAL Difference",
                  description:
                    "At StuImpact, your work directly contributes to MEANINGFUL change in our communities. Every project you complete helps empower students across Washington!",
                  icon: Heart,
                  color: "from-cyan-400 to-blue-500",
                },
                {
                  title: "Develop AMAZING Leadership Skills",
                  description:
                    "Gain INCREDIBLE experience organizing events, leading initiatives, and collaborating with diverse teams. These skills will SUPERCHARGE your academic and professional career!",
                  icon: Trophy,
                  color: "from-blue-400 to-indigo-500",
                },
                {
                  title: "Earn PRESTIGIOUS PVSA Recognition",
                  description:
                    "Your volunteer hours with StuImpact qualify for the Presidential Volunteer Service Award, a PRESTIGIOUS recognition that will make your college applications and resumes STAND OUT!",
                  icon: Award,
                  color: "from-indigo-400 to-violet-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 relative group overflow-hidden"
                >
                  <div
                    className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-[1rem] blur-sm transition-opacity duration-500 z-0"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${item.color.split(" ")[0].replace("from-", "")}, ${item.color.split(" ")[1].replace("to-", "")})`,
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`bg-gradient-to-br ${item.color.replace("from-", "from-").replace("to-", "to-")}/10 rounded-xl p-4 inline-block mb-6 group-hover:scale-110  "from-").replace("to-", "to-")}/10 rounded-xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className={`w-8 h-8 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`} />
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.color} transition-colors`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Specific Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-yellow-500 to-green-500">
                  Your Role in Our EXTRAORDINARY Team
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Tech Team */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl p-4 inline-block mb-6">
                    <Code className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    Tech Team
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    As part of our tech team, you'll build INNOVATIVE solutions that power StuImpact's mission. From
                    developing our platforms to creating tools that connect students with opportunities, your technical
                    skills will directly impact THOUSANDS of students!
                  </p>
                  <ul className="space-y-3 text-slate-600 text-lg">
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span>Develop and maintain our cutting-edge digital platforms</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span>Create innovative tools for explosive student engagement</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-cyan-500 flex-shrink-0 mt-0.5" />
                      <span>Collaborate on game-changing technical solutions for nonprofits</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Marketing & General Team */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative group overflow-hidden transform scale-105 z-20"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-400 opacity-20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-4 inline-block mb-6">
                    <Palette className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                    Marketing & General Team
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    Our marketing team is the CREATIVE FORCE that amplifies StuImpact's message. You'll craft COMPELLING
                    content, design STUNNING materials, and help build our POWERFUL brand presence across Washington
                    state!
                  </p>
                  <ul className="space-y-3 text-slate-600 text-lg">
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Create viral content for our rapidly growing platforms</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Design eye-catching promotional materials for major events</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Develop breakthrough strategies to expand our reach</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Support critical operations and high-impact initiatives</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Outreach Team */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 opacity-20 rounded-bl-full"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-4 inline-block mb-6">
                    <Share2 className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                    Outreach Team
                  </h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    As part of our outreach team, you'll be the VITAL BRIDGE between StuImpact and our community
                    partners. You'll build POWERFUL relationships with schools, nonprofits, and student organizations to
                    DRAMATICALLY expand our impact!
                  </p>
                  <ul className="space-y-3 text-slate-600 text-lg">
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>Connect with influential schools and dynamic student clubs</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>Build game-changing partnerships with nonprofit organizations</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-6 w-6 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span>Represent StuImpact at high-profile community events</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl max-w-3xl mx-auto"
            >
              <div className="mr-6 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                <Flame className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <p className="font-bold text-indigo-800 text-xl mb-1">No matter which team you join...</p>
                <p className="text-indigo-600 text-lg">
                  You'll be part of a DYNAMIC organization that's TAKING OVER the Washington leadership scene! Your
                  contributions will help SHAPE THE FUTURE of student service and leadership!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You'll Achieve Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 to-yellow-500 to-green-500">
                  What You'll ACHIEVE With Us
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Presidential Volunteer Service Award",
                  description:
                    "Qualify for the PRESTIGIOUS PVSA by logging your volunteer hours with StuImpact. This NATIONALLY RECOGNIZED award will make your college applications and resumes STAND OUT from the crowd!",
                  icon: Award,
                  color: "from-amber-400 to-orange-500",
                },
                {
                  title: "EXTRAORDINARY Leadership Experience",
                  description:
                    "Develop ESSENTIAL leadership skills by managing projects, leading initiatives, and collaborating with diverse teams. These experiences will CATAPULT you into future leadership roles!",
                  icon: Users,
                  color: "from-orange-400 to-red-500",
                },
                {
                  title: "POWERFUL Professional Network",
                  description:
                    "Connect with BRILLIANT peers, INSPIRING mentors, and INFLUENTIAL community leaders who share your passion for service and impact. These connections will be INVALUABLE throughout your career!",
                  icon: Share2,
                  color: "from-red-400 to-pink-500",
                },
                {
                  title: "EXPLOSIVE Skill Development",
                  description:
                    "Gain PRACTICAL skills in your area of interest, whether it's technology, marketing, event planning, or community outreach. Apply these skills to make a TANGIBLE difference in the real world!",
                  icon: Zap,
                  color: "from-pink-400 to-purple-500",
                },
                {
                  title: "TRANSFORMATIVE Community Impact",
                  description:
                    "See the DIRECT RESULTS of your work as you help empower students across Washington state. Your contributions will create LASTING POSITIVE CHANGE in our communities!",
                  icon: Heart,
                  color: "from-purple-400 to-indigo-500",
                },
                {
                  title: "OUTSTANDING Recognition & Opportunities",
                  description:
                    "STAND OUT with recognition for your contributions and gain access to EXCLUSIVE opportunities, including leadership positions, special events, and professional development programs!",
                  icon: Trophy,
                  color: "from-indigo-400 to-cyan-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 relative group overflow-hidden"
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
                      <item.icon className={`w-10 h-10 bg-clip-text text-transparent bg-gradient-to-r ${item.color}`} />
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.color} transition-colors`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  {[...Array(30)].map((_, i) => (
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
                  <h3 className="text-4xl font-bold mb-6 text-center">Ready to Begin Your EPIC Journey?</h3>
                  <p className="text-2xl text-white/90 mb-10 text-center max-w-2xl mx-auto">
                    Complete your onboarding process, meet your team, and START MAKING AN IMPACT with StuImpact TODAY!
                  </p>

                  <div className="flex flex-wrap justify-center gap-6">
                    <Link href="https://join.slack.com/t/stuimpact/shared_invite/zt-26d25llme-r0yTOQNfOWH8MRaUfP2cjA">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 rounded-full bg-white text-indigo-600 font-bold text-xl hover:bg-white/90 shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative group"
                      >
                        <span className="relative z-10 flex items-center">
                          COMPLETE ONBOARDING
                          <Rocket className="ml-2 h-6 w-6 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </motion.button>
                    </Link>

                    <Link href="/team">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 rounded-full bg-indigo-500/30 text-white border border-white/20 font-bold text-xl hover:bg-indigo-500/40 shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative group"
                      >
                        <span className="relative z-10 flex items-center">
                          MEET YOUR TEAM
                          <ChevronRight className="ml-2 h-6 w-6 inline group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
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
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} StuImpact. All Rights Reserved.</p>
            <p className="text-sm text-slate-500 mt-1">501(C)3 Non-profit (EIN:61-2122338)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
