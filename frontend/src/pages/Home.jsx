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

      <section className="px-4 md:px-12 lg:px-24 mt-12 mb-20">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <div className="flex items-center justify-between mb-10 animate-fade-in relative">
              <div className="absolute -left-4 w-1 flex-shrink-0 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              <h1 className="text-3xl font-heading font-bold text-white tracking-wide ml-2">Special Products</h1>
              <Link
                to="/shop"
                className="btn-secondary flex items-center gap-2 group"
              >
                Go to Shop <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {data?.products?.map((product) => (
                <div key={product._id} className="w-full flex justify-center">
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
