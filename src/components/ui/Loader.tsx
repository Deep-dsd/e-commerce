import React from 'react'

const Loader = () => {
  return (
    <section className='h-full w-full flex items-start justify-center bg-transparent'>
      <div className='rounded-full animate-spin m-auto w-12 h-12 border-6 border-t-6 border-solid border-x-text border-t-text border-b-accent'/>
    </section>
  )
}

export default Loader