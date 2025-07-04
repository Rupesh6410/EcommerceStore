import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <h1 className="text-red-500 text-center text-lg mt-4">
        Error Loading Products
      </h1>
    );

  return (
    <section className="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-900 xl:ml-[2rem]">
      {/* Admin Menu */}
      <div className="flex justify-end mb-4">
        <AdminMenu />
      </div>

      {/* Header */}
      <h2 className="text-xl font-heading font-bold text-neutral-800 dark:text-white mb-4">
        All Products ({products?.length})
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        {products?.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
          >
            <Link to={`/admin/product/update/${product._id}`}>
              <img
                src={`${IMAGE_BASE_URL}/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>

            <div className="p-4 space-y-1">
              <Link to={`/admin/product/update/${product._id}`}>
                <h3 className="font-semibold text-sm text-neutral-800 dark:text-white truncate">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {moment(product.createdAt).format("DD/MM/YYYY")}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 truncate">
                {product.description?.substring(0, 60)}...
              </p>
              <p className="text-sm font-semibold text-primary">${product.price}</p>

              <button
                onClick={() =>
                  navigate(`/admin/product/update/${product._id}`)
                }
                className="mt-2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-md hover:bg-yellow-500 transition cursor-pointer"
              >
                Update Product
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {products?.length === 0 && (
        <div className="text-center mt-10 text-neutral-600 dark:text-neutral-300 text-sm">
          No products found. Please add new products.
        </div>
      )}
    </section>
  );
};

export default AllProducts;
