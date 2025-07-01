import Header from '../components/Header'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Link , useParams} from 'react-router-dom'
import { useGetProductsQuery } from '../redux/api/productApiSlice'
import Product from './Products/Product'


const Home = () => {

  const {keyword} = useParams();
  const {data , isLoading , isError}=useGetProductsQuery({keyword});

  

  return (

    <>
      {!keyword?<Header />:null}
      {isLoading?<Loader />:isError?(<Message variant="danger">{isError}</Message>):(
        <>
        <div>
          <h1>
            Special Products
          </h1>
          <Link to="/shop" className='ml-[10rem]'>
          Shop
          </Link>

          <div>
            <div className='flex flex-wrap justify-center mt-[2rem]'>
            {data.products.map((product)=>(
              <div key={product._id}>
                <Product product={product}/>
              </div>
            ))}
            </div>
          </div>
        </div>
        </>
      )}
    </>
  )
}

export default Home
