import { render, renderHook, act } from '@testing-library/react'
import { CartProvider, useCartContext } from '@/context/useCartContext'
import { Product } from '@/context/useProductsContext'

const mockProduct:Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  stock: 10,
  description: 'Test Description',
  thumbnail: 'test.jpg'
}

const renderWithProvider = () => {
  return renderHook(() => useCartContext(), {
    wrapper: ({ children }) => <CartProvider>{children}</CartProvider>
  })
}

describe('CartContext', () => {
  test('starts with empty cart', () => {
    const { result } = renderWithProvider()
    
    expect(result.current.cartItems).toEqual([])
  })

  test('can add product to cart', () => {
    const { result } = renderWithProvider()
    
    act(() => {
      result.current.addToCart(mockProduct)
    })
    
    expect(result.current.cartItems).toHaveLength(1)
    expect(result.current.cartItems[0].product.id).toBe(1)
  })

  test('can remove product from cart', () => {
    const { result } = renderWithProvider()
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.removeFromCart(1)
    })
    
    expect(result.current.cartItems).toHaveLength(0)
  })

  test('can clear cart', () => {
    const { result } = renderWithProvider()
    
    act(() => {
      result.current.addToCart(mockProduct)
      result.current.clearCart()
    })
    
    expect(result.current.cartItems).toHaveLength(0)
  })
})