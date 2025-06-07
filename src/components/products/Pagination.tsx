import React from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  nextPage: () => void
  prevPage: () => void
  currentPage: number
  totalPages: number
}

const Pagination:React.FC<PaginationProps> = ({nextPage, prevPage, currentPage, totalPages}) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className='border-2 border-accent-dark/80 shadow-md flex items-center justify-center w-fit mx-auto my-6 lg:mt-10 rounded-[16px] gap-1 p-1'>
      <button
        className={`md:text-3xl text-2xl p-4 rounded-s-xl transition-all duration-300 ease-in-out ${isFirstPage ? 'bg-text/60 cursor-not-allowed opacity-60 text-text' : 'bg-text/20 cursor-pointer hover:bg-accent hover:text-text text-accent-dark'}`}
        onClick={isFirstPage ? undefined : prevPage}
        disabled={isFirstPage}
      >
        <FaChevronLeft/>
      </button>
      <button
        className=' bg-text/15 text-accent-dark text-xl self-stretch px-6 font-medium tracking-wider cursor-pointer'
      >
        Page {currentPage}
      </button>
      <button
        className={`md:text-3xl text-2xl p-4 rounded-e-xl transition-all duration-300 ease-in-out ${isLastPage ? 'bg-text/60 cursor-not-allowed opacity-60 text-text' : 'bg-text/20 cursor-pointer hover:bg-accent hover:text-text text-accent-dark'}`}
        onClick={isLastPage ? undefined : nextPage}
        disabled={isLastPage}
      >
        <FaChevronRight/>
      </button>
    </div>
  )
}

export default Pagination