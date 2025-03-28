"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Link from "next/link"
import { Mail, MapPin, Phone, Menu, X, Heart, Sparkles, Star, ArrowRight } from "lucide-react"

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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
	<button
		className={`w-full px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-medium hover:from-cyan-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 relative group ${className}`}
		{...props}
	>
    <span className="relative z-10 flex items-center justify-center">
      {children}
		<ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
    </span>
		<span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></span>
	</button>
)

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
	<input
		className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${className}`}
		{...props}
	/>
)

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	className?: string
}

const Textarea: React.FC<TextareaProps> = ({ className = "", ...props }) => (
	<textarea
		className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${className}`}
		{...props}
	/>
)

export default function ContactPage() {
	const [name, setName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [message, setMessage] = useState<string>("")
	const [submitted, setSubmitted] = useState<boolean>(false)
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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const response = await fetch("/api/contac", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			})

			if (response.ok) {
				setSubmitted(true)
				setName("")
				setEmail("")
				setMessage("")
			} else {
				alert("Error: Message could not be sent.")
			}
		} catch {
			alert("An error occurred. Please try again.")
		}
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
                  Get In Touch
                </span>
							</h1>
							<p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
								This is more than just a contact page—it's your gateway to internships, partnerships, or any special
								inquiries. Make your voice heard!
							</p>
						</div>
					</div>
				</section>

				{/* Contact Form Section */}
				<section className="py-16 relative overflow-hidden">
					<div className="container mx-auto px-4 relative z-10">
						<div className="max-w-4xl mx-auto">
							<div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative group card-hover-effect">
								<div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

								<div className="relative">
									<div className="flex flex-col md:flex-row gap-10">
										<div className="w-full md:w-1/2">
											<h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
												Contact Information
											</h2>

											<div className="space-y-6 mb-8">
												<a
													href="mailto:inquiries@stuimpact.works"
													className="flex items-center text-slate-600 hover:text-purple-600 transition-colors group"
												>
													<div className="mr-4 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-blue-200 transition-colors">
														<Mail className="w-5 h-5 text-gradient-to-r from-cyan-500 to-blue-500" />
													</div>
													<div>
														<p className="font-medium">Email Us</p>
														<p className="text-slate-500">inquiries@stuimpact.works</p>
													</div>
												</a>

												<a
													href="tel:+14253942112"
													className="flex items-center text-slate-600 hover:text-purple-600 transition-colors group"
												>
													<div className="mr-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
														<Phone className="w-5 h-5 text-gradient-to-r from-blue-500 to-purple-500" />
													</div>
													<div>
														<p className="font-medium">Call Us</p>
														<p className="text-slate-500">+1-425-394-2112</p>
													</div>
												</a>

												<div className="flex items-start text-slate-600 group">
													<div className="mr-4 w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mt-1 flex-shrink-0">
														<MapPin className="w-5 h-5 text-gradient-to-r from-purple-500 to-pink-500" />
													</div>
													<div>
														<p className="font-medium">Visit Us</p>
														<p className="text-slate-500">2018 156th Ave NE Bellevue, WA 98007</p>
													</div>
												</div>
											</div>

											<div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl">
												<h3 className="text-lg font-semibold mb-3 text-indigo-700">Why Reach Out?</h3>
												<ul className="space-y-2 text-slate-600">
													<li className="flex items-start">
														<div className="mr-2 mt-1 h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center">
															<div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
														</div>
														Internship opportunities
													</li>
													<li className="flex items-start">
														<div className="mr-2 mt-1 h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center">
															<div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
														</div>
														Partnership proposals
													</li>
													<li className="flex items-start">
														<div className="mr-2 mt-1 h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center">
															<div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
														</div>
														Volunteer opportunities
													</li>
													<li className="flex items-start">
														<div className="mr-2 mt-1 h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center">
															<div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
														</div>
														General inquiries
													</li>
												</ul>
											</div>
										</div>

										<div className="w-full md:w-1/2">
											<h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
												Send Us a Message
											</h2>

											<form onSubmit={handleSubmit} className="space-y-6">
												<div>
													<label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
														Your Name
													</label>
													<Input
														type="text"
														id="name"
														value={name}
														onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
														placeholder="Enter your full name"
														required
													/>
												</div>

												<div>
													<label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
														Email Address
													</label>
													<Input
														type="email"
														id="email"
														value={email}
														onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
														placeholder="Enter your email address"
														required
													/>
												</div>

												<div>
													<label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
														Message or Request
													</label>
													<Textarea
														id="message"
														value={message}
														onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
														placeholder="Describe your request or message here..."
														rows={6}
														required
													/>
												</div>

												<Button type="submit">{submitted ? "Message Sent!" : "Send Your Message"}</Button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Map Section */}
				<section className="py-16 relative overflow-hidden">
					<div className="container mx-auto px-4 relative z-10">
						<div className="max-w-4xl mx-auto">
							<div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative group card-hover-effect">
								<div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

								<div className="relative">
									<h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
										Find Us
									</h2>

									<div className="rounded-2xl overflow-hidden h-[400px] relative">
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11945.765189647838!2d-122.14018546978419!3d47.629095601960174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906da16976f31b%3A0x5468c1957266004b!2s2018%20156th%20Ave%20NE%2C%20Bellevue%2C%20WA%2098007!5e1!3m2!1sen!2sus!4v1743143344214!5m2!1sen!2sus"
											width="100%"
											height="100%"
											style={{ border: 0 }}
											allowFullScreen={false}
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
											title="StuImpact Location"
											className="absolute inset-0"
										></iframe>
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

