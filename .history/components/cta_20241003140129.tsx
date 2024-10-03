// CTA.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormProps {
name: string
email: string
handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
handleSubmit: () => void
loading: boolean
isHovered: boolean
setIsHovered: (isHovered: boolean) => void
}

export default function Form({
name,
email,
handleNameChange,
handleEmailChange,
handleSubmit,
loading,
isHovered,
setIsHovered
}: FormProps) {
return (
<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
<Input
type="text"
placeholder="Your Name"
value={name}
onChange={handleNameChange}
required
className="w-full border-2 border-teal-400 bg-white/50 placeholder-teal-400 text-teal-600 font-semibold rounded-full px-4 sm:px-6 py-2 sm:py-3"
style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}
/>
<Input
type="email"
placeholder="Your Email"
value={email}
onChange={handleEmailChange}
required
className="w-full border-2 border-teal-400 bg-white/50 placeholder-teal-400 text-teal-600 font-semibold rounded-full px-4 sm:px-6 py-2 sm:py-3"
style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}
/>
<Button
type="submit"
disabled={loading}
className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 sm:py-3 rounded-full transition-colors duration-300 text-lg sm:text-xl join-button ${isHovered ? 'wiggle' : ''}`}
style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
onMouseEnter={() => setIsHovered(true)}
onMouseLeave={() => setIsHovered(false)}
>
{loading ? "Joining..." : "Join the fuss!"}
</Button>





        <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-lg max-w-4xl w-full">
          <p className="text-lg sm:text-xl text-gray-700 font-medium drop-shadow-md" style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}>
            For nearly half a century, TYLER'S has been the heart of family shopping in Texas and a go-to destination!
          </p>

          <Form
            name={name}
            email={email}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            handleSubmit={handleSubmit}
            loading={loading}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />

          <p className="text-lg sm:text-xl text-gray-700 font-medium drop-shadow-md" style={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}>
            Join the waitlist for this EXCITING NEW addition that's gonna make TYLER'S HOME FINDS that HOME GO-TO DESTINATION!
          </p>
        </div>





</form>
)
}

