import React from 'react'
import { FaCartShopping, FaRegCircleUser  } from "react-icons/fa6";
import Link from 'next/link'
import { NavItems } from '@/models/navbar/navbarModels';

interface DesktopNavigationProps {
  navItems: NavItems[]
  pathname: string
}

const DesktopNavigation:React.FC<DesktopNavigationProps> = ({navItems, pathname}) => {
  return (
    <>
      <div className='flex gap-8'>
        {
          navItems.map((item)=> {
            return (
              <Link 
                key={item.href}
                className={`text-xl font-medium tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105 ${pathname === item.href ? 'text-accent': 'text-text hover:text-accent'}
                `}
                href={item.href}
              >
                {item.label}
              </Link>
            )
          })
        }
      </div>
      <div className='flex items-center gap-10'>
        <Link 
          className='text-4xl text-accent transition-all duration-300 ease-in-out transform hover:scale-110'
          href="/cart"
        >
          <FaCartShopping/>
        </Link>
        <Link 
          className='text-4xl text-text/50 transition-all duration-300 ease-in-out transform hover:scale-110'
          href="/profile"
        >
          <FaRegCircleUser/>
        </Link>
      </div>
    </>
  )
}

export default DesktopNavigation