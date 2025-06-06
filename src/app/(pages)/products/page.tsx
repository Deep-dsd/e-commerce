"use client"
import Pagination from '@/components/products/Pagination';
import ProductListCard from '@/components/products/ProductListCard';
import Loader from '@/components/ui/Loader'
import { ProductsDataprovider, useProductsContext } from '@/context/useProductsContext'
import { HiOutlineRefresh } from "react-icons/hi";

const ProductsPage = () => {
  const { products, isLoading, error, fetchProducts, nextPage, prevPage, totalPages, currentPage } = useProductsContext()

  const handleRefresh = () => {
    fetchProducts(1, 12)
  }

  return (
    <section className='bg-primary text-text min-h-screen p-8 flex flex-col'>
      <section className='max-w-[1100px] mx-auto grid place-content-center flex-1 w-full'>
        
        {/* Loading State */}
        {isLoading && <Loader/>}

        {/* Error State */}
        {error && !isLoading && (
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-lg text-accent-dark tracking-wide'>Sorry, something went wrong</p>
            <button 
              onClick={handleRefresh}
              className='flex items-center space-x-2 bg-accent-light text-white font-medium px-4 py-2 rounded-lg tracking-wide cursor-pointer shadow-md'
            >
              <HiOutlineRefresh className='w-5 h-5' />
              <span>Refresh</span>
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <section className=''>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-4'>
              {products.map((product) => (
                <ProductListCard key={product.id} product={product} />
              ))}
            </div>
            {/* Pagination Section */}
            <Pagination
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </section>
        )}
      </section>
    </section>
  )
}

export default function WrappedProductsPage() {
  return (
    <ProductsDataprovider>
      <ProductsPage />
    </ProductsDataprovider>
  )
}