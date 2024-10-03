// CTA.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
</form>
)
}




export default function CTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { name, email });
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-lg">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-2 border-teal-400 bg-white/50 placeholder-teal-400 text-teal-600 font-semibold rounded-full px-4 sm:px-6 py-2 sm:py-3"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-2 border-teal-400 bg-white/50 placeholder-teal-400 text-teal-600 font-semibold rounded-full px-4 sm:px-6 py-2 sm:py-3"
          />
          <Button
            type="submit"
            className={`w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 sm:py-3 rounded-full transition-colors duration-300 text-lg sm:text-xl join-button ${isHovered ? 'wiggle' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Join the fuss!
          </Button>
        </form>
      ) : (
        <div className="space-y-2">
          <p className="text-xl sm:text-2xl font-semibold text-teal-600 drop-shadow-md">You're on the list!</p>
          <p className="text-lg sm:text-xl text-gray-700 drop-shadow-md">We're excited to introduce you to a trusted and exciting way to decorate homes.</p>
        </div>
      )}
    </div>
  );
}