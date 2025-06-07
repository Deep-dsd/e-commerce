"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DesktopNavigation from './DesktopNavigation';
import { NavItems } from '@/models/navbar/navbarModels';
import { useWindowWidth } from '@/lib/useWindowWidth';
import MobileNavigation from './MobileNavigation';
import { useCartContext } from '@/context/useCartContext';

const Navbar = () => {
  const {getTotalItems} = useCartContext()
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const windowWidth = useWindowWidth()

  const totalCartItems = getTotalItems()

  useEffect(()=>{
    const handleScroll = ()=>{
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return ()=> window.removeEventListener("scroll", handleScroll)
  })

  const navItems:NavItems[] = [
    { href: '/products', label: 'Products' },
    { href: '/about-us', label: 'About Us' }
  ]

  return (
    <nav 
      className={`py-3 px-6 md:px-11 lg:px-15 flex justify-between items-center backdrop-blur-sm sticky z-50 transition-all duration-500 ease-in-out 
      ${isScrolled 
        ? 'mx-4 top-4 rounded-3xl border border-text/20 shadow-lg bg-primary/60'
        : "mx-0 top-0 rounded-none border-none shadow-md bg-text/5"
      }
    `}>
      <Link 
        className='relative md:w-11 md:h-11 w-8 h-8 cursor-pointer inline-block'
        href="/products"
      >
        <Image
          src="/assets/images/logo.png"
          alt='Logo'
          fill={true}
        />
      </Link>
      {
        windowWidth > 769 ? (
          <DesktopNavigation
            navItems = {navItems}
            pathname = {pathname}
            totalCartItems = {totalCartItems}
          />
        ) : (
          <MobileNavigation
            navItems = {navItems}
            pathname = {pathname}
            totalCartItems = {totalCartItems}
          />
        )
      }
    </nav>
  )
}

export default Navbar