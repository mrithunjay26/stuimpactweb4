"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import axios from "axios"
import {
  X,
  Search,
  Menu,
  ChevronDown,
  ChevronUp,
  Heart,
  Sparkles,
  Star,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Filter,
  Briefcase,
  Award,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Job {
  _id: string
  title: string
  description: string
  url: string
  tags: string[]
  prestige?: string
  type?: string
}

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

export default function OpportunityFinder() {
  const [location, setLocation] = useState<string>("Washington")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(true)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const headerRef = useRef<HTMLElement>(null)

  const clearJobsIfNewSearch = () => {
    const prevSearchParams = localStorage.getItem("searchParams")
    const currentSearchParams = JSON.stringify({
      interest: selectedSubjects.join(" "),
      grade: selectedGrades.join(","),
      location,
    })

    if (prevSearchParams !== currentSearchParams) {
      setJobs([])
      setCurrentPage(1)
      setHasMore(true)
      localStorage.removeItem("jobs")
    }

    localStorage.setItem("searchParams", currentSearchParams)
  }

  const fetchJobs = async (page: number) => {
    setLoading(true)
    clearJobsIfNewSearch()

    try {
      const response = await axios.post("/api/searchjobs", {
        interest: selectedSubjects.join(" "),
        grade: selectedGrades.join(","),
        location,
        page,
      })

      const { opportunities } = response.data
      if (Array.isArray(opportunities)) {
        const uniqueJobs = new Map([...jobs, ...opportunities].map((job) => [job._id, job]))

        setJobs(Array.from(uniqueJobs.values()))
        setHasMore(opportunities.length > 0)
        setCurrentPage(page)
        localStorage.setItem("jobs", JSON.stringify(Array.from(uniqueJobs.values())))
      } else {
        console.error("Expected an array of opportunities but got:", opportunities)
      }
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs")
    const storedSearchParams = localStorage.getItem("searchParams")
    if (storedJobs && storedSearchParams) {
      try {
        const parsedJobs = JSON.parse(storedJobs)
        if (Array.isArray(parsedJobs)) {
          setJobs(parsedJobs)
        } else {
          console.error("Invalid stored job data:", parsedJobs)
        }
      } catch (error) {
        console.error("Error parsing stored job data:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (jobs.length === 0) {
      fetchJobs(currentPage)
    }
  }, [jobs])

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 2) {
      if (hasMore && !loading) {
        fetchJobs(currentPage + 1)
      }
    }
    setScrolled(window.scrollY > 50)
  }, [currentPage, hasMore, loading])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const showJobDetails = (job: Job) => {
    setSelectedJob(job)
  }

  const closeOverlay = () => {
    setSelectedJob(null)
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeOverlay()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const toggleFilters = () => setFiltersOpen(!filtersOpen)

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
          <section className="relative pt-32 pb-16 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Opportunity Finder
                </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
                  Discover the perfect opportunities to advance your skills, build your resume, and make a meaningful
                  impact.
                </p>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect mb-12">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                      <div className="w-full md:w-auto">
                        <button
                            className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group"
                            onClick={() => fetchJobs(1)}
                        >
                        <span className="relative z-10 flex items-center justify-center">
                          <Search className="mr-2 h-5 w-5" />
                          Search Opportunities
                        </span>
                          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                        </button>
                      </div>

                      <div className="w-full md:w-auto md:hidden">
                        <button
                            className="w-full px-8 py-4 rounded-full bg-white text-slate-800 border border-slate-200 font-medium hover:bg-slate-50 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300 relative group"
                            onClick={toggleFilters}
                        >
                        <span className="relative z-10 flex items-center justify-center">
                          <Filter className="mr-2 h-5 w-5" />
                          {filtersOpen ? "Hide Filters" : "Show Filters"}
                          {filtersOpen ? (
                              <ChevronUp className="ml-2 h-5 w-5" />
                          ) : (
                              <ChevronDown className="ml-2 h-5 w-5" />
                          )}
                        </span>
                        </button>
                      </div>
                    </div>

                    <div className="text-center text-slate-600 text-sm">
                      <p>Select ONLY one subject and one grade level EACH for results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Section */}
          <section className="py-8 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className={`w-full md:w-1/4 md:block ${filtersOpen ? "block" : "hidden"}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-24 card-hover-effect">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1rem] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                    <div className="relative z-10">
                      <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                        Refine Your Search
                      </h2>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 text-slate-700">Subject Area</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {[
                            "BIOLOGY",
                            "COMPUTER SCIENCE",
                            "ENVIRONMENTAL SCIENCE",
                            "ENGINEERING",
                            "MEDICAL",
                            "CHEMISTRY",
                            "ARTS PERFORMANCE",
                            "MATHEMATICS",
                            "ENGLISH LITERATURE WRITING",
                            "GENERAL",
                            "PUBLIC ADMINISTRATION",
                            "DATA SCIENCE",
                            "POLITICAL SCIENCE",
                            "LAW",
                            "PHYSICS",
                            "BUSINESS",
                            "PSYCHOLOGY",
                            "KINESIOLOGY",
                            "PHILOSOPHY",
                          ].map((subject) => (
                              <div key={subject} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={subject}
                                    className="mr-2 form-checkbox text-purple-600 rounded focus:ring-purple-500"
                                    checked={selectedSubjects.includes(subject)}
                                    onChange={() => {
                                      setSelectedSubjects((prev) =>
                                          prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject],
                                      )
                                    }}
                                />
                                <label
                                    htmlFor={subject}
                                    className="text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                                >
                                  {subject}
                                </label>
                              </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-slate-700">Grade Level</h3>
                        <div className="space-y-2">
                          {["FRESHMEN", "SOPHOMORES", "JUNIORS", "SENIORS"].map((grade) => (
                              <div key={grade} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={grade}
                                    className="mr-2 form-checkbox text-purple-600 rounded focus:ring-purple-500"
                                    checked={selectedGrades.includes(grade)}
                                    onChange={() => {
                                      setSelectedGrades((prev) =>
                                          prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade],
                                      )
                                    }}
                                />
                                <label
                                    htmlFor={grade}
                                    className="text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                                >
                                  {grade}
                                </label>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Results Section */}
                <section className="w-full md:w-3/4">
                  {loading && (
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center mb-8">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 border-4 border-t-purple-600 border-b-purple-600 border-l-transparent border-r-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-xl font-medium text-slate-700">Searching for opportunities...</p>
                          <p className="text-slate-500">Finding the perfect match for your interests</p>
                        </div>
                      </div>
                  )}

                  {!loading && jobs.length === 0 && (
                      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center mb-8">
                        <div className="flex flex-col items-center justify-center">
                          <Search className="w-16 h-16 text-slate-300 mb-4" />
                          <p className="text-xl font-medium text-slate-700">No opportunities found</p>
                          <p className="text-slate-500 mb-6">Try adjusting your filters or search criteria</p>
                          <button
                              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium hover:from-cyan-700 hover:to-blue-700 shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                              onClick={() => fetchJobs(1)}
                          >
                            Search Again
                          </button>
                        </div>
                      </div>
                  )}

                  {jobs.length > 0 && (
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {jobs.map((job, index) => {
                          const gradeLevels =
                              job.tags?.filter((tag) => ["FRESHMEN", "SOPHOMORES", "JUNIORS", "SENIORS"].includes(tag)) || []
                          const types =
                              job.tags?.filter((tag) => !["FRESHMEN", "SOPHOMORES", "JUNIORS", "SENIORS"].includes(tag)) || []
                          const paragraphs = job.description.split(/(?<=\.)\s+/)

                          return (
                              <div
                                  key={index}
                                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect relative group cursor-pointer"
                                  onClick={() => showJobDetails(job)}
                              >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1rem] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                                <div className="relative z-10">
                                  <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                    {job.title}
                                  </h3>

                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {types.map((type, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                                        >
                                  {type}
                                </span>
                                    ))}

                                    {gradeLevels.map((grade, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                                        >
                                  {grade}
                                </span>
                                    ))}
                                  </div>

                                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">{paragraphs[0]}</p>

                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-500">Location: {location}</span>
                                    <span className="text-sm text-purple-600 flex items-center">
                                View Details
                                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </span>
                                  </div>
                                </div>
                              </div>
                          )
                        })}
                      </div>
                  )}

                  {hasMore && jobs.length > 0 && !loading && (
                      <div className="text-center mt-8">
                        <button
                            className="px-6 py-3 rounded-full bg-white text-slate-800 border border-slate-200 font-medium hover:bg-slate-50 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300"
                            onClick={() => fetchJobs(currentPage + 1)}
                        >
                          Load More Opportunities
                        </button>
                      </div>
                  )}
                </section>
              </div>
            </div>
          </section>

          {/* Job Details Overlay */}
          {selectedJob && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] p-8 rounded-3xl shadow-2xl overflow-y-auto relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        {selectedJob.title}
                      </h2>
                      <button
                          onClick={closeOverlay}
                          className="text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden h-48 mb-6">
                      <Image
                          src="/1652721200604.png?height=800&width=1200"
                          alt={selectedJob.title}
                          fill
                          className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.tags?.map((tag, i) => (
                              <span
                                  key={i}
                                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                              >
                          {tag}
                        </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {selectedJob.type && (
                          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl flex items-center">
                            <Briefcase className="w-5 h-5 text-indigo-600 mr-3" />
                            <div>
                              <p className="text-xs text-indigo-500">Type</p>
                              <p className="text-sm font-medium text-indigo-800">{selectedJob.type}</p>
                            </div>
                          </div>
                      )}

                      {selectedJob.prestige && (
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl flex items-center">
                            <Award className="w-5 h-5 text-purple-600 mr-3" />
                            <div>
                              <p className="text-xs text-purple-500">Prestige</p>
                              <p className="text-sm font-medium text-purple-800">{selectedJob.prestige}</p>
                            </div>
                          </div>
                      )}

                      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-xl flex items-center">
                        <MapPin className="w-5 h-5 text-cyan-600 mr-3" />
                        <div>
                          <p className="text-xs text-cyan-500">Location</p>
                          <p className="text-sm font-medium text-cyan-800">{location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4 text-slate-800">Description</h3>
                      <div className="prose prose-slate max-w-none">
                        {selectedJob.description.split(/(?<=\.)\s+/).map((para, i) => (
                            <p key={i} className="mb-3 text-slate-600">
                              {para}
                            </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                          href={selectedJob.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 text-center relative group"
                      >
                    <span className="relative z-10 flex items-center justify-center">
                      Apply Now
                      <ExternalLink className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
                      </a>

                      <button
                          onClick={closeOverlay}
                          className="px-8 py-4 rounded-full bg-white text-slate-800 border border-slate-200 font-medium hover:bg-slate-50 shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1 transition-all duration-300 relative group"
                      >
                        <span className="relative z-10">Back to Results</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </main>

        <footer className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-16 relative overflow-hidden border-t border-slate-100 mt-20">
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

