import React from 'react'
import Filter from './Filter'
import Products from './Products'


function Home() {

  return (
    <div className='flex gap-5'> 
     <Filter />
     <Products />
    </div>
  )
}

export default Home