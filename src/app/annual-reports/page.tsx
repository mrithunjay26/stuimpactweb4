"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Download,
  Calendar,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// Annual reports data - add your PDFs to the public folder
const annualReports = [
  {
    year: 2024,
    title: "2024 Annual Report",
    description: "Our most impactful year yet",
    pdfUrl: "/annual-reports/2025-report.pdf",
    highlights: ["10,000+ students reached", "50+ schools partnered", "95% satisfaction rate"],
    isFeatured: true,
  },
]

export default function AnnualReportsPage() {
  const [selectedReport, setSelectedReport] = useState<(typeof annualReports)[0] | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [scale, setScale] = useState(1.0)
  const viewerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedReport) return

      if (e.key === "ArrowLeft" && pageNumber > 1) {
        setPageNumber(pageNumber - 1)
      } else if (e.key === "ArrowRight" && pageNumber < numPages) {
        setPageNumber(pageNumber + 1)
      } else if (e.key === "Escape") {
        closeViewer()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedReport, pageNumber, numPages])

  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (selectedReport) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [selectedReport])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setLoading(false)
  }

  const openReport = (report: (typeof annualReports)[0]) => {
    setSelectedReport(report)
    setPageNumber(1)
    setLoading(true)
  }

  const closeViewer = () => {
    setSelectedReport(null)
    setPageNumber(1)
    setNumPages(0)
  }

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const featuredReport = annualReports.find((r) => r.isFeatured) || annualReports[0]
  const otherReports = annualReports.filter((r) => !r.isFeatured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white overflow-x-hidden relative">
      <style jsx global>{`
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes pageFlip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-90deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }

        .page-flip-enter {
          animation: pageFlip 0.6s ease-in-out;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] -top-[500px] -left-[500px] bg-indigo-500/30 rounded-full blur-3xl pulse-glow" />
        <div
          className="absolute w-[800px] h-[800px] top-[20%] -right-[400px] bg-purple-500/30 rounded-full blur-3xl pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute w-[600px] h-[600px] bottom-[10%] left-[20%] bg-pink-500/20 rounded-full blur-3xl pulse-glow"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating particles */}
        <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-indigo-400 rounded-full animate-float" />
        <div
          className="absolute top-[35%] left-[85%] w-2 h-2 bg-purple-400 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-[55%] left-[25%] w-3 h-3 bg-pink-400 rounded-full animate-float"
          style={{ animationDelay: "6s" }}
        />
        <div
          className="absolute top-[75%] left-[70%] w-2 h-2 bg-blue-400 rounded-full animate-float"
          style={{ animationDelay: "9s" }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold relative group">
            <img src="/stuimpactt.png" alt="StuImpact Logo" className="h-10 relative z-10" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/annual-reports" className="text-sm font-medium text-white">
              Annual Reports
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 relative z-10">
        <section className="py-12 overflow-hidden">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-indigo-200">Our Most Impactful Year Yet</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200">
                2024 Annual Report
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                In our short history, 2024 stands as a defining moment. We're building on these successes to create even
                greater impact.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
            >
              <div
                className="relative group cursor-pointer"
                onClick={() => openReport(featuredReport)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openReport(featuredReport)
                  }
                }}
                aria-label={`Open ${featuredReport.title}`}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10">
                  <div className="shimmer absolute inset-0"></div>

                  <div className="relative p-12 md:p-16">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      {/* Left side - Report preview */}
                      <div className="flex-shrink-0">
                        <div className="relative w-64 h-80 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Calendar className="w-20 h-20 mx-auto mb-4 opacity-90" />
                            <h3 className="text-6xl font-bold mb-2">{featuredReport.year}</h3>
                            <p className="text-lg opacity-90">Annual Report</p>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                      </div>

                      {/* Right side - Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/30 mb-4">
                          <TrendingUp className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-yellow-300">Record-Breaking Impact</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                          {featuredReport.title}
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">{featuredReport.description}</p>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          {featuredReport.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                            >
                              <p className="text-sm text-indigo-300 font-semibold">{highlight}</p>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                          <button
                            className="group/btn px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              openReport(featuredReport)
                            }}
                          >
                            <BookOpen className="w-6 h-6" />
                            Read Full Report
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <a
                            href={featuredReport.pdfUrl}
                            download
                            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Download ${featuredReport.title}`}
                          >
                            <Download className="w-5 h-5" />
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {otherReports.length > 0 && (
          <section className="py-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-slate-200">Previous Years</h2>

                <div
                  className={`grid ${otherReports.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 md:grid-cols-2"} gap-6`}
                >
                  {otherReports.map((report, index) => (
                    <div
                      key={report.year}
                      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-indigo-400/50 transition-all duration-300 cursor-pointer group transform hover:scale-105 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                      style={{ animationDelay: `${600 + index * 150}ms` }}
                      onClick={() => openReport(report)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          openReport(report)
                        }
                      }}
                      aria-label={`Open ${report.title}`}
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl font-bold">{report.year}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{report.title}</h3>
                            <p className="text-sm text-slate-400">{report.description}</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            className="flex-1 px-4 py-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              openReport(report)
                            }}
                          >
                            <BookOpen className="w-4 h-4" />
                            Read
                          </button>
                          <a
                            href={report.pdfUrl}
                            download
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Download ${report.title}`}
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-400" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Building on Success</h2>
                <p className="text-xl text-slate-200 leading-relaxed mb-8">
                  "Empowering students to create meaningful change in their communities through connection and
                  collaboration. Every year, we're reaching more students, creating deeper impact, and building a
                  stronger network of changemakers."
                </p>
                <div className="inline-flex items-center gap-2 text-indigo-300 font-medium">
                  <TrendingUp className="w-5 h-5" />
                  <span>The StuImpact Mission</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PDF Viewer Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedReport.title} PDF Viewer`}
        >
          <div className="w-full h-full flex flex-col">
            {/* Viewer Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold">{selectedReport.title}</h3>
                <span className="text-slate-400">
                  Page {pageNumber} of {numPages}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={selectedReport.pdfUrl}
                  download
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  aria-label={`Download ${selectedReport.title}`}
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <button
                  onClick={closeViewer}
                  className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Close PDF viewer (Press Escape)"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* PDF Display */}
            <div ref={viewerRef} className="flex-1 overflow-auto flex items-center justify-center p-8 bg-slate-800">
              <div className="relative">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-lg">
                    <div className="text-white text-lg">Loading PDF...</div>
                  </div>
                )}
                <Document
                  file={selectedReport.pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center p-20">
                      <div className="text-white text-lg">Loading document...</div>
                    </div>
                  }
                  error={
                    <div className="flex items-center justify-center p-20">
                      <div className="text-red-400 text-lg">Failed to load PDF. Please try downloading instead.</div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    className="shadow-2xl page-flip-enter"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-center gap-6 border-t border-white/10">
              <button
                onClick={prevPage}
                disabled={pageNumber <= 1}
                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                aria-label="Previous page (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">
                  {pageNumber} / {numPages}
                </span>
              </div>

              <button
                onClick={nextPage}
                disabled={pageNumber >= numPages}
                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                aria-label="Next page (Right Arrow)"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Keyboard Shortcuts Help */}
            <div className="bg-slate-900 text-slate-400 text-xs px-6 py-2 text-center border-t border-slate-800">
              Keyboard shortcuts: ← Previous | → Next | Esc Close
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
