import { render, screen, fireEvent } from '@testing-library/react'
import ProductListCard from '@/components/products/ProductListCard'
import { CartProvider } from '@/context/useCartContext'
import { Product } from '@/context/useProductsContext'

const mockProduct:Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test description',
  price: 29.99,
  stock: 10,
  thumbnail: 'test.jpg'
}

const renderWithProvider = (product:Product) => {
  return render(
    <CartProvider>
      <ProductListCard product={product} />
    </CartProvider>
  )
}

describe('ProductListCard', () => {
  test('shows product information', () => {
    renderWithProvider(mockProduct)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('Stock: 10')).toBeInTheDocument()
  })

  test('shows add to cart button', () => {
    renderWithProvider(mockProduct)
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  test('adds product to cart when clicked', () => {
    renderWithProvider(mockProduct)
    
    const button = screen.getByText('Add to Cart')
    fireEvent.click(button)
    
    expect(screen.getByText('Add More')).toBeInTheDocument()
    expect(screen.getByText('In Cart')).toBeInTheDocument()
  })
})