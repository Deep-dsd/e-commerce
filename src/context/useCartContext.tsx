import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Product } from "./useProductsContext";

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  loading: boolean
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: ()=> void
  getTotalAmount: ()=> number
  getTotalItems: ()=> number
  isInCart: (productId: number) => boolean
  getCartItemQuantity: (productId: number) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode}>  = ({children}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  //Loading cart data from LocalStorage on mount
  useEffect(()=>{
    if(typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if(savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          localStorage.removeItem('cart');
        }
      }
      setLoading(false)
    }
  }, [])

  //Updating LocalStorage whenever cartItems changes
  useEffect(()=>{
    if(typeof window !== "undefined" && !loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  },[cartItems, loading])

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id)

      //If item exists, increasing the quantity
      if(existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id
            ? {...item, quantity: Math.min(item.quantity + 1, product.stock)}
            : item
        )
      } else {
        // If item does not exist just add
        return [...prevItems, {product, quantity: 1}]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if(quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems => 
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const getCartItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalAmount,
        getTotalItems,
        isInCart,
        getCartItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = ()=>{
  const context = useContext(CartContext)
  if(context === undefined) {
    throw new Error("Cart Context Failed")
  }
  return context
}