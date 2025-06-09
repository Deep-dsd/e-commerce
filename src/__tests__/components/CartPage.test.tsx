import { render, screen, fireEvent } from '@testing-library/react'
import CartPage from '@/app/(pages)/cart/page'
import { CartProvider } from '@/context/useCartContext'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
}))

const renderWithProvider = () => {
  return render(
    <CartProvider>
      <CartPage />
    </CartProvider>
  )
}

describe('CartPage', () => {
  test('shows cart title', () => {
    renderWithProvider()
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
  })

  test('shows empty cart message when no items', () => {
    renderWithProvider()
    expect(screen.getByText('Start Shopping')).toBeInTheDocument()
  })

  test('start shopping button redirects to products page', () => {
    const mockReplace = jest.fn()
    
    require('next/navigation').useRouter = jest.fn(() => ({
      replace: mockReplace,
      push: jest.fn(),
    }))
    
    renderWithProvider()
    
    const startShoppingBtn = screen.getByText('Start Shopping')
    fireEvent.click(startShoppingBtn)
    
    expect(mockReplace).toHaveBeenCalledWith('/products')
  })
})