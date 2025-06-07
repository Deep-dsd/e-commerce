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
  test('shows empty cart message', () => {
    renderWithProvider()
    
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
    expect(screen.getByText('Start Shopping')).toBeInTheDocument()
  })

  test('shows cart title', () => {
    renderWithProvider()
    
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    renderWithProvider()
    
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
  })
})