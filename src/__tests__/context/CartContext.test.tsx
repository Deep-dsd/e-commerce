import { render, renderHook, act } from '@testing-library/react'
import { CartProvider, useCartContext } from '@/context/useCartContext'
import { Product } from '@/context/useProductsContext'

const mockProductOne:Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  stock: 2,
  description: 'Test Description',
  thumbnail: 'test.jpg'
}

const mockProductTwo: Product = {
  id: 2,
  title: 'Test Product Two',
  price: 19.99,
  stock: 13,
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
      result.current.addToCart(mockProductOne)
    })
    
    expect(result.current.cartItems).toHaveLength(1)
    expect(result.current.cartItems[0].product.id).toBe(1)
  })

  test('can remove product from cart', () => {
    const { result } = renderWithProvider()
    
    act(() => {
      result.current.addToCart(mockProductOne)
      result.current.removeFromCart(1)
    })
    
    expect(result.current.cartItems).toHaveLength(0)
  })

  test('can clear cart', () => {
    const { result } = renderWithProvider()
    
    act(() => {
      result.current.addToCart(mockProductOne)
      result.current.clearCart()
    })
    
    expect(result.current.cartItems).toHaveLength(0)
  })

  test("Can calculate total amount", ()=>{
    const {result} = renderWithProvider()

    act(()=>{
      result.current.addToCart(mockProductOne)
      result.current.addToCart(mockProductTwo)
      result.current.addToCart(mockProductTwo)
    })

    const cartItemOne = result.current.cartItems[0]
    const cartItemTwo = result.current.cartItems[1]

    const totalAmount = (cartItemOne.product.price * cartItemOne.quantity) + (cartItemTwo.product.price * cartItemTwo.quantity)

    expect(result.current.getTotalAmount()).toEqual(totalAmount)
  })

  test("Same product addition increases the quantity", ()=>{
    const {result} = renderWithProvider()

    act(()=>{
      result.current.addToCart(mockProductOne)
      result.current.addToCart(mockProductOne)
    })
    expect(result.current.cartItems[0].quantity).toEqual(2)
  })

  test("Can find total cart items", ()=>{
    const {result} =renderWithProvider()

    act(()=>{
      result.current.addToCart(mockProductOne)
      result.current.addToCart(mockProductTwo)
      result.current.addToCart(mockProductTwo)
      result.current.addToCart(mockProductTwo)
    })

    const cartItemOne = result.current.cartItems[0]
    const cartItemTwo = result.current.cartItems[1]

    const cartQuantity = cartItemOne.quantity + cartItemTwo.quantity
    expect(result.current.getTotalItems()).toEqual(cartQuantity)
  })

  test("Can find quantity for individual cart Items", ()=>{
    const {result} =renderWithProvider()

    act(()=>{
      result.current.addToCart(mockProductOne)
      result.current.addToCart(mockProductTwo)
      result.current.addToCart(mockProductTwo)
      result.current.addToCart(mockProductTwo)
    })

    const cartItemTwo = result.current.cartItems[1]

    const cartQuantity = cartItemTwo.quantity
    expect(result.current.getCartItemQuantity(cartItemTwo.product.id)).toEqual(cartQuantity)
  })

  test("Can update product quantity for cart items", ()=>{
    const {result} =renderWithProvider()

    act(()=>{
      result.current.addToCart(mockProductTwo)
      result.current.updateQuantity(mockProductTwo.id, 3)
    })

    expect(result.current.getTotalItems()).toEqual(3)
  })

})
