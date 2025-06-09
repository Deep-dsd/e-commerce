import { render, screen, fireEvent } from '@testing-library/react'
import ProductListCard from '@/components/products/ProductListCard'
import { CartProvider } from '@/context/useCartContext'
import { Product, ProductsDataprovider } from '@/context/useProductsContext'

const normalProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  stock: 15,
  description: 'Test Description',
  thumbnail: 'test.jpg'
}

const lowStockProduct: Product = {
  id: 2,
  title: 'Test Product',
  price: 10.00,
  stock: 5,
  description: 'Test Description',
  thumbnail: 'test.jpg'
}

const soldOutProduct: Product = {
  id: 3,
  title: 'Test Product',
  price: 5.99,
  stock: 0,
  description: 'Test Description',
  thumbnail: 'test.jpg'
}

function renderWithProvider(component: React.ReactElement) {
  return render(
    <ProductsDataprovider>
      <CartProvider>
        {component}
      </CartProvider>
    </ProductsDataprovider>
  )
}

describe('ProductListCard', () => {
  
  test('shows product information', () => {
    renderWithProvider(<ProductListCard product={normalProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Stock: 15')).toBeInTheDocument()
  })

  test('shows Add to Cart button', () => {
    renderWithProvider(<ProductListCard product={normalProduct} />)
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
    expect(screen.queryByText('In Cart')).toBeNull()
  })

  test('button changes to "Add More" after clicking', () => {
    renderWithProvider(<ProductListCard product={normalProduct} />)
    
    const button = screen.getByText('Add to Cart')
    fireEvent.click(button)
    
    expect(screen.getByText('Add More')).toBeInTheDocument()
    expect(screen.getByText('In Cart')).toBeInTheDocument()
  })

  test('shows "Low Stock" warning when stock is less than 10', () => {
    renderWithProvider(<ProductListCard product={lowStockProduct} />)
    
    expect(screen.getByText('Low Stock')).toBeInTheDocument()
  })

  test('shows "Out of Stock" for zero stock products', () => {
    renderWithProvider(<ProductListCard product={soldOutProduct} />)
    
    expect(screen.getAllByText('Out of Stock')).toHaveLength(2)
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Out of Stock')
    expect(button).toBeDisabled()
  })
})