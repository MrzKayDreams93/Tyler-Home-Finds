'use client'

import { useState, useEffect } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import CTA from "@/components/cta"

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
    ,]}