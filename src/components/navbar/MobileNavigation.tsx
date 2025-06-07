"use client"
import { NavItems } from '@/models/navbar/navbarModels'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaCartShopping, FaRegCircleUser } from 'react-icons/fa6'
import { HiMenuAlt3, HiX } from "react-icons/hi"

interface MobileNavigationProps {
  navItems: NavItems[]
  pathname: string
  totalCartItems: number
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({navItems, pathname, totalCartItems}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  //Hiding Scroll when Modal is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileMenuOpen])

  const mobileMenu = (
    <div 
      className='fixed inset-0 bg-primary/95 backdrop-blur-md z-[9999] duration-300 ease-in-out'
    >
      <button
        className='absolute top-6 right-6 text-4xl text-text transition-colors duration-300 ease-in-out hover:text-accent z-[10000] cursor-pointer'
        onClick={() => setIsMobileMenuOpen(false)}
        aria-label="Close mobile menu"
      >
        <HiX />
      </button>

      <div className='flex flex-col items-center justify-center h-full space-y-8'>
        {navItems.map((item) => (
          <Link 
            key={item.href}
            className={`
              text-2xl font-medium tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105
              ${pathname === item.href 
                ? 'text-accent' 
                : 'text-white hover:text-accent'
              }
            `}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <div className='flex items-center gap-8 mt-8 animate-in slide-in-from-bottom duration-500 delay-300'>
          <Link 
            className={`text-4xl text-accent transition-all duration-300 ease-in-out transform hover:scale-110 relative`}
            href="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaCartShopping/>
            {
            totalCartItems > 0 && (
              <span className='inline-block text-primary bg-text absolute text-sm h-5 w-5 rounded-full -top-2 -right-3 text-center'>
                {totalCartItems}
              </span>
            )
          }
          </Link>
          <Link 
            className={`text-4xl text-text/50 transition-all duration-300 ease-in-out transform hover:scale-110`}
            href="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaRegCircleUser/>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        className='cursor-pointer text-3xl text-text transition-colors duration-300 ease-in-out hover:text-accent'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      {/* renders on top of everything */}
      {mounted && isMobileMenuOpen && createPortal(mobileMenu, document.body)}
    </>
  )
}

export default MobileNavigation