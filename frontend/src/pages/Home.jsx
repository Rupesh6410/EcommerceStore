import Header from '../components/Header';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Product from './Products/Product';

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}

      <section className="px-4 md:px-12 lg:px-24 mt-6">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Special Products</h1>
              <Link
                to="/shop"
                className="text-white bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded-lg transition duration-300"
              >
                Go to Shop →
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {data?.products?.map((product) => (
                <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
