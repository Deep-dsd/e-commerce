import { useCartContext } from '@/context/useCartContext'
import { Product } from '@/context/useProductsContext'
import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'

interface ProductCardProps {
  product: Product
}

const ProductListCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, description, price, stock, thumbnail } = product
  const {addToCart, isInCart, getCartItemQuantity} = useCartContext()

  const handleAddToCart = ()=>{
    addToCart(product)
  }

  const inCart = isInCart(product.id)

  return (
    <div className="bg-primary rounded-xl shadow-md overflow-hidden border border-text/20 flex flex-col relative">
      {/* In Cart Badge */}
      {inCart && (
        <div className="absolute top-2 left-2 bg-green-500 rounded-md  z-10 shadow-md flex items-center gap-2 p-1">
          <span className='inline-block text-xs text-text'>
            In Cart
          </span>
          <FaCartShopping
            className='text-text'
          />
        </div>
      )}
      {/* Product Image */}
      <div className="relative h-48 bg-text/90">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain"
        />
        {(stock < 10 && stock > 0) && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white tracking-wide shadow-md text-xs px-2 py-1 rounded-md">
            Low Stock
          </div>
        )}
        {stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 tracking-wide shadow-md text-white text-xs px-2 py-1 rounded-md">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-text/40 text-sm mb-3 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-text/80 tracking-wider">
            Stock: {stock}
          </span>
        </div>

        <button 
          className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-300 mt-auto tracking-wide cursor-pointer ${
            stock > 0 
              ? 'bg-button-one hover:tracking-wider text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={stock === 0}
          onClick={handleAddToCart}
        >
          {stock > 0 ? (inCart ? 'Add More' : 'Add to Cart') : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

export default ProductListCard
