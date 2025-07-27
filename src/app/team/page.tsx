"use client"
import { useState, useEffect, useRef } from "react"
import {
	Mail,
	Menu,
	X,
	Heart,
	Sparkles,
	Star,
	Phone,
	MapPin,
	ArrowRight,
	Award,
	Users,
	Calendar,
	Briefcase,
	ChevronLeft,
	ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

// Board Members (updated to include only Mrithunjay and Aasrith)
const boardMembers = [
	{
		name: "Mrithunjay Tanish Shanmuganand",
		role: "President & Co-Founder",
		image: "/mitu.jpeg",
		bio: "President and visionary leader, guiding StuImpact's mission to empower students through meaningful opportunities and community engagement.",
		achievements: [
			"Founded StuImpact in December 2023",
			"Established partnerships with 2 nonprofit organizations",
			"Led the development of 5 core programs",
			"Built a dedicated team of 25+ members",
			"Reached 800+ students through various initiatives",
		],
		quote: "We're not just preparing students for the future—we're empowering them to make an impact today.",
	},
	{
		name: "Aasrith Gnana Arvapalli",
		role: "Director of Legal & Strategy",
		image: "/aasrith.png",
		bio: "Aasrith oversees legal compliance and strategic planning, ensuring StuImpact's initiatives are both impactful and sustainable for long-term growth.",
		achievements: [
			"Secured 501(c)(3) nonprofit status",
			"Developed the governance framework for the organization",
			"Created comprehensive legal documentation and policies",
			"Established strategic partnerships to expand StuImpact's reach",
			"Guided the organization's mission alignment across all programs",
		],
		quote:
			"Strong legal and strategic foundations allow our mission to flourish and create lasting impact for students.",
	},
]

// Top Team Members (updated with the 3 specified leads)
const teamLeads = [
	{
		name: "Brian Kearl",
		role: "Head of Technology",
		image: "/brian.jpg",
		bio: "Brian leads all technical initiatives at StuImpact, from developing our digital platforms to ensuring scalable infrastructure that supports our growing community.",
		department: "Technology",
		joinDate: "January 2024",
		impact: "Built the Student Impact Ambassador Portal used by clubs across Washington",
		responsibilities: [
			"Overseeing platform development and maintenance",
			"Implementing technology solutions for student engagement",
			"Managing technical infrastructure and data systems",
			"Leading the technical team and volunteer developers",
		],
	},
	{
		name: "Shaurya Shrivastava",
		role: "Director of Operations",
		image: "/shaurya.PNG",
		bio: "Shaurya manages day-to-day operations, ensuring efficient processes and seamless execution of StuImpact's programs and initiatives across all departments.",
		department: "Operations",
		joinDate: "February 2024",
		impact: "Streamlined volunteer management processes, increasing engagement by 40%",
		responsibilities: [
			"Coordinating across departments for seamless program execution",
			"Developing operational procedures and best practices",
			"Managing event planning and logistics",
			"Ensuring resource allocation aligns with organizational priorities",
		],
	},
	{
		name: "Nitin Munugeti",
		role: "Head of Business Development",
		image: "/nitin.PNG",
		bio: "Nitin drives growth strategies and partnerships, identifying opportunities to expand StuImpact's reach and impact through strategic collaborations and funding initiatives.",
		department: "Business",
		joinDate: "March 2024",
		impact: "Secured key partnerships that expanded our program offerings to 5 distinct initiatives",
		responsibilities: [
			"Identifying and securing strategic partnerships",
			"Developing sustainable funding models and revenue streams",
			"Leading outreach to schools and community organizations",
			"Creating growth strategies for expanding StuImpact's impact",
		],
	},
]

// Testimonials from team members
const testimonials = [
	{
		quote:
			"Being part of StuImpact from its early days has been an incredible journey. Seeing students discover their potential through our programs makes every challenge worthwhile.",
		name: "Mrithunjay Tanish",
		role: "President & Co-Founder",
	},
	{
		quote:
			"What makes StuImpact special is our focus on creating opportunities that truly matter to students. We're building more than just a nonprofit—we're building a movement.",
		name: "Brian Kearl",
		role: "Head of Technology",
	},
	{
		quote:
			"It's inspiring to see how quickly we've grown while staying true to our mission. The dedication of our team and the enthusiasm of the students we serve drives everything we do.",
		name: "Nitin Munugeti",
		role: "Head of Business Development",
	},
	{
		quote:
			"StuImpact represents what happens when passionate people come together with a clear purpose. In just over a year, we've created something that's making a real difference.",
		name: "Aasrith Gnana",
		role: "Director of Legal & Strategy",
	},
]

// Organization milestones based on the provided snippet
const milestones = [
	{
		year: "December 2023",
		title: "Foundation",
		description:
			"StuImpact was established with a mission to empower the next generation of leaders through service, learning, and community engagement.",
	},
	{
		year: "January 2024",
		title: "First Partnerships",
		description:
			"Launched initial partnerships with nonprofit organizations in Washington State to provide students with meaningful volunteering opportunities.",
	},
	{
		year: "March 2024",
		title: "Student Impact Ambassadors",
		description:
			"Established the Student Impact Ambassador program to expand our reach and execute events through partnered clubs.",
	},
	{
		year: "June 2024",
		title: "Nonprofit Internships",
		description:
			"Began offering internships with nonprofit partners to enhance students' soft skills and provide real-world experience.",
	},
	{
		year: "September 2024",
		title: "Semester Opportunity List",
		description:
			"Launched our curated list of 250+ opportunities each semester to connect students with meaningful experiences.",
	},
	{
		year: "June 2025",
		title: "TecBiz Competition",
		description:
			"Planning our first TecBiz Competition where teams of students will create software solutions and business plans addressing real-world challenges.",
	},
]

// StuImpact's programs
const programs = [
	{
		name: "Student Impact Ambassadors",
		description:
			"Empowering student club representatives to organize and lead impactful community service initiatives.",
		icon: Users,
	},
	{
		name: "Nonprofit Internships",
		description: "Connecting students with hands-on internship experiences at partner nonprofit organizations.",
		icon: Briefcase,
	},
	{
		name: "Mentorship Program",
		description: "Pairing students with professionals in STEM and other fields for guidance and career development.",
		icon: Star,
	},
	{
		name: "Semester Opportunities",
		description: "Curating 250+ meaningful volunteer and learning opportunities each semester for students.",
		icon: Calendar,
	},
	{
		name: "TecBiz Competition",
		description: "Challenging student teams to develop innovative tech solutions to real-world problems.",
		icon: Award,
	},
]

export default function TeamPage() {
	const [menuOpen, setMenuOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [activeTab, setActiveTab] = useState("grid")
	const [currentTestimonial, setCurrentTestimonial] = useState(0)
	const [currentBoardMember, setCurrentBoardMember] = useState(0)
	const headerRef = useRef<HTMLElement>(null)

	const toggleMenu = () => setMenuOpen(!menuOpen)

	const nextTestimonial = () => {
		setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
	}

	const prevTestimonial = () => {
		setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
	}

	const nextBoardMember = () => {
		setCurrentBoardMember((prev) => (prev === boardMembers.length - 1 ? 0 : prev + 1))
	}

	const prevBoardMember = () => {
		setCurrentBoardMember((prev) => (prev === 0 ? boardMembers.length - 1 : prev - 1))
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

	// Auto-rotate testimonials
	useEffect(() => {
		const interval = setInterval(() => {
			nextTestimonial()
		}, 8000)
		return () => clearInterval(interval)
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
        
        .timeline-item {
          position: relative;
          padding-left: 2rem;
          padding-bottom: 2rem;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #6366f1, #a855f7, #ec4899);
        }
        
        .timeline-item::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(to right, #6366f1, #a855f7);
        }

        .tab-active {
          background-color: white;
          color: #6366f1;
          font-weight: 500;
        }

        .tab-inactive {
          background-color: transparent;
          color: #64748b;
        }

        .tab-inactive:hover {
          color: #334155;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 1;
          border-radius: 9999px;
          background: linear-gradient(to right, #6366f1, #a855f7);
          color: white;
        }

        .carousel-container {
          position: relative;
          overflow: hidden;
        }

        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
          display: flex;
          align-items: center;
          justify-center: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 10;
          cursor: pointer;
          transition: all 0.2s;
        }

        .carousel-button:hover {
          background-color: #f9fafb;
        }

        .carousel-button-prev {
          left: 1rem;
        }

        .carousel-button-next {
          right: 1rem;
        }
        
        .program-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .program-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
        }
        
        .program-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .icon-background {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
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
								{ name: "StuConnect", href: "/stuconnect" },
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
								{ name: "StuConnect", href: "/stuconnect" },
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
				{/* Hero Section */}
				<section className="relative pt-32 pb-16 overflow-hidden">
					<div className="container mx-auto px-4 relative z-10">
						<div className="max-w-4xl mx-auto text-center">
							<h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Meet Our Team
                </span>
							</h1>
							<p className="text-xl md:text-2xl text-slate-600 mb-6 max-w-3xl mx-auto">
								The passionate individuals behind StuImpact, working tirelessly to empower the next generation of
								leaders and change-makers.
							</p>
							<p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
								While our full team consists of <span className="font-semibold">25+ dedicated members</span>, this page
								showcases our leadership team who guide our organization's vision and direction.
							</p>

							{/* Quick stats */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
								<div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-100">
									<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
										<Users className="w-6 h-6" />
									</div>
									<h3 className="text-3xl font-bold text-slate-800">25+</h3>
									<p className="text-slate-600">Team Members</p>
								</div>

								<div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-100">
									<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
										<Calendar className="w-6 h-6" />
									</div>
									<h3 className="text-3xl font-bold text-slate-800">2</h3>
									<p className="text-slate-600">Years of Impact</p>
								</div>

								<div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-100">
									<div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white mx-auto mb-3">
										<Briefcase className="w-6 h-6" />
									</div>
									<h3 className="text-3xl font-bold text-slate-800">5</h3>
									<p className="text-slate-600">Programs</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Board Members Section with Tabs */}
				<section className="py-16 relative overflow-hidden">
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-6 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Board of Directors
              </span>
						</h2>
						<p className="text-center text-slate-600 mb-16 max-w-3xl mx-auto">
							Our board members provide strategic vision and oversight, guiding StuImpact's growth since our founding in
							December 2023.
						</p>

						{/* Custom tabs */}
						<div className="w-full max-w-6xl mx-auto">
							<div className="flex justify-center mb-8">
								<div className="inline-flex rounded-md bg-slate-100/80 backdrop-blur-sm p-1">
									<button
										onClick={() => setActiveTab("grid")}
										className={`px-4 py-2 rounded-md transition-colors ${
											activeTab === "grid" ? "tab-active" : "tab-inactive"
										}`}
									>
										Grid View
									</button>
									<button
										onClick={() => setActiveTab("carousel")}
										className={`px-4 py-2 rounded-md transition-colors ${
											activeTab === "carousel" ? "tab-active" : "tab-inactive"
										}`}
									>
										Carousel
									</button>
									<button
										onClick={() => setActiveTab("detailed")}
										className={`px-4 py-2 rounded-md transition-colors ${
											activeTab === "detailed" ? "tab-active" : "tab-inactive"
										}`}
									>
										Detailed
									</button>
								</div>
							</div>

							{/* Grid View - Modified for 2 board members */}
							{activeTab === "grid" && (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
									{boardMembers.map((member, index) => (
										<div
											key={index}
											className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect relative group"
										>
											<div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1rem] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

											<div className="relative z-10">
												<div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
													<Image
														src={member.image || "/placeholder.svg?height=256&width=384"}
														alt={member.name}
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-105"
													/>
												</div>

												<h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
													{member.name}
												</h3>

												<p className="font-medium text-slate-700 mb-4">{member.role}</p>

												<p className="text-slate-600 mb-6">{member.bio}</p>

												<div className="flex space-x-3">
													<a
														href={`mailto:${member.name.toLowerCase()}@stuimpact.works`}
														className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white transform hover:scale-110 transition-transform"
													>
														<Mail className="w-4 h-4" />
													</a>
												</div>
											</div>
										</div>
									))}
								</div>
							)}

							{/* Carousel View */}
							{activeTab === "carousel" && (
								<div className="carousel-container w-full max-w-4xl mx-auto">
									<div className="flex overflow-hidden">
										<div
											className="flex transition-transform duration-300 ease-in-out"
											style={{
												width: `${boardMembers.length * 100}%`,
												transform: `translateX(-${(100 / boardMembers.length) * currentBoardMember}%)`,
											}}
										>
											{boardMembers.map((member, index) => (
												<div key={index} className="w-full px-4" style={{ flex: `0 0 ${100 / boardMembers.length}%` }}>
													<div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 h-full">
														<div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
															<Image
																src={member.image || "/placeholder.svg?height=192&width=320"}
																alt={member.name}
																fill
																className="object-cover"
															/>
														</div>
														<h3 className="text-lg font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
															{member.name}
														</h3>
														<p className="text-sm font-medium text-slate-700 mb-3">{member.role}</p>
														<p className="text-sm text-slate-600 mb-4">{member.bio}</p>
														<div className="mt-auto">
															<a
																href={`mailto:${member.name.toLowerCase()}@stuimpact.works`}
																className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white"
															>
																<Mail className="w-3 h-3" />
															</a>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>
									<button
										onClick={prevBoardMember}
										className="carousel-button carousel-button-prev"
										aria-label="Previous"
									>
										<ChevronLeft className="h-5 w-5 text-slate-600" />
									</button>
									<button onClick={nextBoardMember} className="carousel-button carousel-button-next" aria-label="Next">
										<ChevronRight className="h-5 w-5 text-slate-600" />
									</button>
								</div>
							)}

							{/* Detailed View */}
							{activeTab === "detailed" && (
								<div className="space-y-12">
									{boardMembers.map((member, index) => (
										<div
											key={index}
											className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 relative overflow-hidden"
										>
											<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
											<div className="md:flex gap-8">
												<div className="md:w-1/3 mb-6 md:mb-0">
													<div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
														<Image
															src={member.image || "/placeholder.svg?height=320&width=240"}
															alt={member.name}
															fill
															className="object-cover"
														/>
													</div>
													<div className="flex space-x-3 mt-4">
														<a
															href={`mailto:${member.name.toLowerCase()}@stuimpact.works`}
															className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white transform hover:scale-110 transition-transform"
														>
															<Mail className="w-5 h-5" />
														</a>
													</div>
												</div>
												<div className="md:w-2/3">
													<h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
														{member.name}
													</h3>
													<p className="text-lg font-medium text-slate-700 mb-4">{member.role}</p>
													<div className="mb-6">
														<h4 className="text-lg font-semibold mb-2 text-slate-800">About</h4>
														<p className="text-slate-600">{member.bio}</p>
													</div>
													<div className="mb-6">
														<h4 className="text-lg font-semibold mb-2 text-slate-800">Key Achievements</h4>
														<ul className="space-y-2">
															{member.achievements.map((achievement, i) => (
																<li key={i} className="flex items-start">
																	<Award className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
																	<span className="text-slate-600">{achievement}</span>
																</li>
															))}
														</ul>
													</div>
													<div>
														<h4 className="text-lg font-semibold mb-2 text-slate-800">Quote</h4>
														<blockquote className="pl-4 border-l-4 border-purple-300 italic text-slate-600">
															"{member.quote}"
														</blockquote>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Team Leads Section */}
				<section className="py-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-6 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Leadership Team
              </span>
						</h2>
						<p className="text-center text-slate-600 mb-16 max-w-3xl mx-auto">
							These key team leads manage our day-to-day operations and represent just a few of our 25+ member team
							working behind the scenes.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
							{teamLeads.map((member, index) => (
								<div
									key={index}
									className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 card-hover-effect relative group"
								>
									<div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1rem] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

									<div className="relative z-10">
										<div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
											<Image
												src={member.image || "/placeholder.svg?height=192&width=320"}
												alt={member.name}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										</div>

										<h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
											{member.name}
										</h3>

										<p className="font-medium text-slate-700 mb-4">{member.role}</p>

										<div className="mb-4 space-y-2">
											<div className="flex items-center">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full border border-purple-200 mr-2">
                          {member.department}
                        </span>
												<span className="text-sm text-slate-500">Since {member.joinDate}</span>
											</div>
											<p className="text-slate-600 text-sm italic">"{member.impact}"</p>
										</div>

										<p className="text-slate-600 mb-6">{member.bio}</p>

										<div className="flex space-x-3">
											<a
												href={`mailto:${member.name.toLowerCase().replace(" ", ".")}@stuimpact.org`}
												className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white transform hover:scale-110 transition-transform"
											>
												<Mail className="w-4 h-4" />
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Programs Section */}
				<section className="py-16 relative overflow-hidden">
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-6 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Our Programs
              </span>
						</h2>
						<p className="text-center text-slate-600 mb-16 max-w-3xl mx-auto">
							Led by our dedicated team, these five core programs help us fulfill our mission of empowering students
							through meaningful opportunities.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
							{programs.map((program, index) => {
								const Icon = program.icon
								return (
									<div key={index} className="program-card bg-white p-6 rounded-xl shadow-md">
										<div className="w-12 h-12 icon-background rounded-full flex items-center justify-center mb-4">
											<Icon className="w-6 h-6 text-indigo-600" />
										</div>
										<h3 className="text-lg font-bold mb-2 text-slate-800">{program.name}</h3>
										<p className="text-slate-600">{program.description}</p>
									</div>
								)
							})}
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className="py-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Team Voices
              </span>
						</h2>

						<div className="carousel-container w-full max-w-4xl mx-auto">
							<div className="bg-white border border-slate-100 shadow-md rounded-2xl overflow-hidden">
								<div className="p-8">
									<div className="flex mb-2">
										{[...Array(5)].map((_, i) => (
											<Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
										))}
									</div>
									<blockquote className="text-xl italic text-slate-700 mb-6">
										"{testimonials[currentTestimonial].quote}"
									</blockquote>
									<div className="flex items-center">
										<div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-4">
											{testimonials[currentTestimonial].name.charAt(0)}
										</div>
										<div>
											<p className="font-bold text-slate-800">{testimonials[currentTestimonial].name}</p>
											<p className="text-slate-600">{testimonials[currentTestimonial].role}</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex justify-center mt-4 space-x-2">
								{testimonials.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentTestimonial(index)}
										className={`w-3 h-3 rounded-full transition-colors ${
											currentTestimonial === index ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-slate-300"
										}`}
										aria-label={`Go to testimonial ${index + 1}`}
									/>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Organization Timeline */}
				<section className="py-16 relative overflow-hidden">
					<div className="container mx-auto px-4 relative z-10">
						<h2 className="text-4xl font-bold mb-16 text-center">
              <span className="gradient-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Our Journey
              </span>
						</h2>

						<div className="max-w-3xl mx-auto">
							{milestones.map((milestone, index) => (
								<div key={index} className="timeline-item">
									<div className="mb-2">
										<span className="badge">{milestone.year}</span>
									</div>
									<h3 className="text-xl font-bold mb-2 text-slate-800">{milestone.title}</h3>
									<p className="text-slate-600 mb-4">{milestone.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Join Our Team Section */}
				<section className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
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
									<h3 className="text-3xl font-bold mb-6 text-center">Join Our Team</h3>
									<p className="text-xl text-white/90 mb-10 text-center max-w-2xl mx-auto">
										Are you passionate about empowering youth and making a difference in your community? We're always
										looking for talented individuals to join our mission.
									</p>

									<div className="flex flex-wrap justify-center gap-6">
										<Link href="/contact">
											<button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-medium hover:bg-white/90 shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group">
                        <span className="relative z-10 flex items-center">
                          Join Us
                          <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
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
