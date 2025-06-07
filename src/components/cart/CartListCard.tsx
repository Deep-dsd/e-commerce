import { useCartContext } from '@/context/useCartContext'
import { Product } from '@/context/useProductsContext'
import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";

interface CartListCardProps {
  product: Product
  quantity: number
}

const CartListCard:React.FC<CartListCardProps> = ({product, quantity}) => {
  const {updateQuantity, removeFromCart, } = useCartContext()
  return (
    <div className="bg-primary rounded-lg shadow-md p-6 border border-text/20">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Image */}
        <div className="w-full md:w-32 md:h-32 h-48 bg-text/10 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text mb-2">
            {product.title}
          </h3>
          <p className="text-text/60 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-text/60">
              Stock: {product.stock}
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end justify-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-8 h-8 bg-text/10 hover:bg-text/20 rounded-md flex items-center justify-center text-text transition-colors cursor-pointer"
              disabled={quantity <= 1}
            >
              <FaMinus/>
            </button>
            <span className="w-12 text-center font-medium text-text">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 bg-text/10 hover:bg-text/20 rounded-md flex items-center justify-center text-text transition-colors cursor-pointer"
              disabled={quantity >= product.stock}
            >
              <FaPlus/>
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-semibold text-text">
              ${(product.price * quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-red-500 hover:text-red-600 text-sm transition-colors mt-1 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartListCard