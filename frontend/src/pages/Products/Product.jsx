import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({product}) => {
  return (
    <div>
        <div className='w-[12rem] h-[12rem] gap-x-6 relative'>
            <img src={product.image} alt={product.name} />


            <HeartIcon product={product}/>



        </div>
        <div>
            <Link to={`/product/${product._id}`}>
            <h2>
                <div className='flex justify-between'>
                    {product.name}
                    <span>${product.price}</span>
                </div>

            </h2>
            </Link>
        </div>
    </div>
  )
}

export default Product
