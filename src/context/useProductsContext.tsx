import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface Product {
  id: number
  title: string
  description: string
  price: number
  stock: number
  thumbnail: string
}

interface ApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

interface ProductsDataContextType {
  products: Product[]
  total: number
  currentPage: number
  limit: number
  error: Error | null
  isLoading: boolean
  fetchProducts: (page?: number, itemsPerPage?: number) => Promise<void>
  nextPage: () => void
  prevPage: () => void
  totalPages: number
}

const ProductsContext = createContext<ProductsDataContextType | undefined>(undefined)

export const ProductsDataprovider:React.FC<{children: ReactNode}> =({children}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(12)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const totalPages = Math.ceil(total / limit)

  //Fetching products in paginated form
  const fetchProducts = async (page: number = 1, itemsPerPage: number = 12) => {
    try {
      setIsLoading(true)
      setError(null)

      const skip = (page - 1) * itemsPerPage
      const response = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`)

      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      
      console.log(data)
      setProducts(data.products)
      setTotal(data.total)
      setCurrentPage(page)
      setLimit(itemsPerPage)

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'))
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const nextPage = () => {
    const totalPages = Math.ceil(total / limit)
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1, limit)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1, limit)
    }
  }

  // Fetching initial data
  useEffect(() => {
    if(typeof window !== "undefined") {
      fetchProducts(1, 12)
    }
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        products,
        total,
        currentPage,
        limit,
        error,
        isLoading,
        fetchProducts,
        nextPage,
        prevPage,
        totalPages
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if(context === undefined) {
    throw new Error("Products Context Failed.")
  }
  return context
}