import { render, screen, fireEvent } from '@testing-library/react'
import CartSummary from '@/components/cart/CartSummary'
import { CartProvider, useCartContext } from '@/context/useCartContext'
import { useEffect } from 'react'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 10.00,
  stock: 5,
  description: 'Test Description',
  thumbnail: 'test.jpg'
}

const TestCartSummary = () => {
  const { addToCart } = useCartContext()
  
  useEffect(() => {
    addToCart(mockProduct)
    addToCart(mockProduct)
  }, [])
  
  return <CartSummary />
}

const renderWithProvider = () => {
  return render(
    <CartProvider>
      <TestCartSummary />
    </CartProvider>
  )
}

describe('CartSummary', () => {
  test('shows real cart data', () => {
    renderWithProvider()
    
    expect(screen.getByText('Total Items: 2')).toBeInTheDocument()
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument()
  })

  test('has checkout button', () => {
    renderWithProvider()
    expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument()
  })

  test('clear cart button works', () => {
    renderWithProvider()
    
    const clearBtn = screen.getByText('Clear Cart')
    fireEvent.click(clearBtn)
  })
})