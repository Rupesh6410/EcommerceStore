import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const navigate = useNavigate(); // ✅ Initialize useNavigate()

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <h1 className="text-red-500 text-center text-lg mt-4">
        Error Loading Products
      </h1>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen ml-[4%]">
      <div className="flex justify-end">
        <AdminMenu />
      </div>

      {/* Title and Count */}
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        All Products ({products?.length})
      </h2>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            {/* Link wrapping only the image and title */}
            <Link to={`/admin/product/update/${product._id}`}>
              <div className="h-48 w-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-3">
              <Link to={`/admin/product/update/${product._id}`}>
                <h5 className="text-sm font-semibold text-gray-800 truncate">
                  {product.name}
                </h5>
              </Link>
              <p className="text-xs text-gray-500 mt-1">
                {moment(product.createdAt).format("DD/MM/YYYY")}
              </p>
              <p className="text-gray-600 text-xs mt-1 truncate">
                {product?.description?.substring(0, 50)}...
              </p>
              <p className="text-gray-600 flex items-center mt-1">${product.price}</p>

              <div className="mt-2">
              
                <button
                  onClick={() =>
                    navigate(`/admin/product/update/${product._id}`)
                  }
                  className="text-black rounded-sm text-xs hover:underline bg-blue-400 py-1 px-2"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Products Message */}
      {products?.length === 0 && (
        <div className="text-center mt-10 text-gray-600 text-sm">
          No products found. Please add new products.
        </div>
      )}
    </div>
  );
};

export default AllProducts;
