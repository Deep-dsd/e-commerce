import { useCartContext } from '@/context/useCartContext'
import React from 'react'

const CartSummary = () => {
  const {getTotalItems, getTotalAmount, clearCart} = useCartContext()

  return (
    <div className="sm:mt-8 mt-4 bg-primary rounded-lg shadow-md p-6 border border-text/20">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium text-text">
          Total Items: {getTotalItems()}
        </span>
        <span className="text-2xl font-bold text-green-600">
          Total: ${getTotalAmount().toFixed(2)}
        </span>
      </div>
      <div className="flex gap-4">
        <button className="flex-1 bg-button-one hover:bg-button-one/90 text-white py-3 px-6 rounded-md font-medium transition-colors cursor-pointer tracking-wide">
          Proceed to Checkout
        </button>
        <button 
          onClick={clearCart}
          className="bg-text/10 hover:bg-text/20 text-text py-3 px-6 rounded-md font-medium transition-colors cursor-pointer tracking-wide"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}

export default CartSummary