'use client'

import { useState, useEffect } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import confetti from 'canvas-confetti'
import CTA from "@/components/cta"
import Logos from "@/components/logos"
import Particles from "@/components/ui/particles"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fireworks, setFireworks] = useState([])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const createFirework = () => {
      const colors = ['#00CED1', '#FFA500', '#A9A9A9']
      return {
        id: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: Math.random() * 2 + 1
      }
    }

    const interval = setInterval(() => {
      setFireworks(prev => [...prev.slice(-50), createFirework()])
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) {
      toast.error("Please fill in all fields 😠")
      return
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address 😠")
      return
    }

    setLoading(true)

    const promise = new Promise(async (resolve, reject) => {
      try {
        const mailResponse = await fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname: name, email }),
        })

        if (!mailResponse.ok) {
          if (mailResponse.status === 429) {
            reject("Rate limited")
          } else {
            reject("Email sending failed")
          }
          return
        }

        const notionResponse = await fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        })

        if (!notionResponse.ok) {
          if (notionResponse.status === 429) {
            reject("Rate limited")
          } else {
            reject("Notion insertion failed")
          }
        } else {
          resolve({ name })
        }
      } catch (error) {
        reject(error)
      }
    })

    toast.promise(promise, {
      loading: "Getting you on the waitlist... 🚀",
      success: (data) => {
        setName("")
        setEmail("")
        setIsSubmitted(true)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        return "Thank you for joining the waitlist 🎉"
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "You're doing that too much. Please try again later"
        } else if (error === "Email sending failed") {
          return "Failed to send email. Please try again 😢."
        } else if (error === "Notion insertion failed") {
          return "Failed to save your details. Please try again 😢."
        }
        return "An error occurred. Please try again 😢."
      },
    })

    promise.finally(() => {
      setLoading(false)
    })
  }

  const featuredProducts = [
    { 
      name: "Luxe Reclining Living Room Set", 
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-08%206.54.54%20PM-Heuw5C1kte0mQzLLrytKJE9p0M8xEv.png",
      description: "Elevate your living space with our plush gray reclining sofa set, perfect for ultimate relaxation."
    },
    { 
      name: "Cozy Autumn Living Room", 
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-08%207.03.18%20PM-dnqJvQYMpBZ3TCiJUm7UGpAEWsHR83.png",
      description: "Create a warm and inviting atmosphere with our lift-top coffee table and vibrant orange accents."
    },
    { 
      name: "Natural Wood Dining Set", 
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-08%207.06.29%20PM-W2hULHOSQt0qQvtYBn7kXhCPleQOL1.png",
      description: "Bring rustic charm to your dining area with our solid wood table and chair set."
    },
    { 
      name: "Modern Bedroom Collection", 
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-08%207.08.50%20PM-uPGlaPx2Ete971rO2CClt8WZwB9Etw.png",
      description: "Transform your bedroom into a contemporary retreat with our light wood furniture and upholstered headboard."
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      <style jsx>{`
        .join-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .join-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          transform: scale(0);
          transition: transform 0.6s ease-out;
        }
        .join-button:hover::before {
          transform: scale(1);
        }
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
        .wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }
      `}</style>
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="absolute rounded-full animate-firework"
          style={{
            backgroundColor: firework.color,
            width: firework.size,
            height: firework.size,
            left: `${firework.left}%`,
            top: `${firework.top}%`,
            animationDuration: `${firework.animationDuration}s`
          }}
        />
      ))}
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="relative w-full max-w-4xl space-y-8 text-center z-10 p-6 my-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-teal-600 drop-shadow-lg whitespace-nowrap flex items-center justify-center">
              <span className="font-serif italic tracking-tighter" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>TYLER'S</span>
              <span className="font-serif italic tracking-tighter ml-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>HOME FINDS</span>
            </h1>
            <p className="text-4xl font-semibold text-orange-400 font-serif italic tracking-tighter" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Coming soon!</p>
          </div>

          <CTA />

          <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 space-y-6 shadow-lg">
            <p className="text-xl text-gray-700 font-medium drop-shadow-md" style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}>
              For nearly half a century, TYLER'S has been the heart of family shopping in Texas and a go-to destination!
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-2 border-teal-400 bg-white/50 placeholder-teal-400 text-teal-600 font-semibold rounded-full px-6 py-3"
                  style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2 border-teal-400 bg-white/50 placeholder-teal-400 text-teal-600 font-semibold rounded-full px-6 py-3"
                  style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}
                />
                <Button 
                  type="submit" 
                  className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-full transition-colors duration-300 text-xl join-button ${isHovered ? 'wiggle' : ''}`}
                  style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  disabled={loading}
                >
                  {loading ? 'Joining...' : 'Join the fuss!'}
                </Button>
              </form>
            ) : (
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-teal-600 drop-shadow-md" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>You're on the list!</p>
                <p className="text-xl text-gray-700 drop-shadow-md" style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}>We're excited to introduce you to a trusted and exciting way to decorate homes.</p>
              </div>
            )}

            <p className="text-xl text-gray-700 font-medium drop-shadow-md" style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}>
              Join the waitlist for this EXCITING NEW addition that's gonna make TYLER'S HOME FINDS that HOME GO-TO DESTINATION!
            </p>
          </div>

          <Logos />

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-teal-600 mb-6">Featured Products</h2>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {featuredProducts.map((product, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center px-2">{product.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                Discover a world of comfort and style with our featured products. From the luxurious reclining living room set that promises ultimate relaxation, to the cozy autumn-inspired space with its clever lift-top coffee table and vibrant accents. Bring a touch of nature indoors with our rustic solid wood dining set, perfect for family gatherings. And for a peaceful night's sleep, our modern bedroom collection offers a contemporary retreat with light wood furniture and an elegant upholstered headboard. Each piece is carefully selected to transform your house into a home that reflects your unique style and comfort needs.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg text-gray-700 drop-shadow-sm" style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}>
              Brought to you by TYLER'S - 
              <a href="https://tylerstx.com" className="text-orange-400 hover:underline ml-1 font-semibold">
                it's a Texas tradition built on a foundation of quality and trust.
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
    </main>
  )
}