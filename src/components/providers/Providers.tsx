"use client"
import { CartProvider } from '@/context/useCartContext'
import { ProductsDataprovider } from '@/context/useProductsContext'
import React, { ReactNode } from 'react'
import Navbar from '../navbar/Navbar'

interface ProvidersProps {
  children: ReactNode
}

const Providers:React.FC<ProvidersProps> = ({children}) => {
  return (
    <ProductsDataprovider>
      <CartProvider>
        <Navbar/>
        {children}
      </CartProvider>
    </ProductsDataprovider>
  )
}

export default Providers