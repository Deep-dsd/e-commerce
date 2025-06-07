"use client"
import CartListCard from '@/components/cart/CartListCard'
import CartSummary from '@/components/cart/CartSummary'
import Loader from '@/components/ui/Loader'
import { useCartContext } from '@/context/useCartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const CartPage: React.FC = () => {
  const { cartItems, loading } = useCartContext()
  const router = useRouter()

  const productsPageRedirection = ()=> {
    router.replace("/products")
  }

  return (
    <section className='bg-primary text-text min-h-screen p-8 flex flex-col'>
      <h1 className="text-3xl tracking-wide font-bold text-text mb-8 mx-auto">
        Shopping Cart
      </h1>
      {
        (loading || cartItems.length === 0) && (
          <section className='max-w-[1100px] mx-auto grid place-content-center flex-1 w-full'>
            {/* Loading State */}
            {loading && <Loader/>}

            {/* Empty Cart State */}
            {cartItems.length === 0 && !loading && (
              <div className="mx-auto p-2 flex flex-col items-center">
                <div className='relative sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] mr-6 sm:mr-10'>
                  <Image
                    src="/assets/images/empty-cart.png"
                    alt='Empty Cart'
                    fill={true}
                  />
                </div>
                <button 
                  className='bg-button-two text-text text-lg tracking-wide px-4 py-1 shadow-md rounded-lg cursor-pointer'
                  onClick={productsPageRedirection}
                >
                  Start Shopping
                </button>
              </div>
            )}
          </section>
        )
      }
      {cartItems.length > 0 && (
        <section className='max-w-[1100px] mx-auto flex-1 w-full'>
          {/* Cart Items */}
          <div className="grid sm:gap-6 gap-4">
            {cartItems.map(({ product, quantity }) => (
              <CartListCard
              key={product.id}
                product={product}
                quantity={quantity}
              />   
            ))}
          </div>
          {/* Cart Summary */}
          <CartSummary/>
        </section> 
      )}
    </section>
  )
}

export default CartPage