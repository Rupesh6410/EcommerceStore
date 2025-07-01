import React from 'react'
import { useSelector } from 'react-redux'
import { selectFavoriteProduct } from '../../redux/features/favorites/favoriteSlice'    
import Product from './Product'

const Favorites = () => {
    const favorites=useSelector(selectFavoriteProduct);
    
    
  return (
    <div className='ml-[10rem]'>
        <h1 className='text-lg font-bold ml-[3rem] mt-[3rem]'>
            FAVORITE PRODUCT
        </h1>
        <div className='flex flex-wrap space-x-4 mt-[4rem]'>
            {
                favorites.map((product)=>(
                    <div key={product._id}>
                    <Product key={product._id} product={product} />
                                        
                    </div>

                ))
            }

        </div>
      
    </div>
  )
}

export default Favorites
