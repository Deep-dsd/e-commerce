import { render, screen, fireEvent } from '@testing-library/react'
import CartListCard from '@/components/cart/CartListCard'
import { CartProvider } from '@/context/useCartContext'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  stock: 5,
  description: 'This is a test product description',
  thumbnail: 'test.jpg'
}

const renderWithProvider = (quantity = 2) => {
  return render(
    <CartProvider>
      <CartListCard product={mockProduct} quantity={quantity} />
    </CartProvider>
  )
}

describe('CartListCard', () => {
  test('displays product information', () => {
    renderWithProvider()
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('Stock: 5')).toBeInTheDocument()
  })

  test('shows quantity', () => {
    renderWithProvider(3)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('shows total price', () => {
    renderWithProvider(2)
    expect(screen.getByText('$59.98')).toBeInTheDocument()
  })

  test('buttons work with real context', () => {
    renderWithProvider()
    
    const increaseBtn = screen.getByRole('button', { name: 'Reduce Quantity' })
    const decreaseBtn = screen.getByRole('button', { name: 'Increase Quantity' })
    const removeBtn = screen.getByText('Remove')
    
    fireEvent.click(increaseBtn)
    fireEvent.click(decreaseBtn) 
    fireEvent.click(removeBtn)
  })
})