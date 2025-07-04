import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("image", image);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      await createProduct(productData).unwrap();
      toast.success("Product Created Successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Product Create Failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 sm:p-10 bg-white rounded-2xl shadow-xl xl:ml-[16rem]">
      <div className="flex justify-end mb-4">
        <AdminMenu />
      </div>

      <h1 className="text-2xl font-heading font-bold text-center text-neutral-800 mb-6">
        Create Product
      </h1>

      {imageUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-48 h-48 object-cover border border-dashed rounded-xl"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Upload */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-1 text-neutral-700">
            Upload Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadFileHandler}
            className="block w-full file:cursor-pointer file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-accent file:text-white
              hover:file:bg-yellow-500
              text-sm text-neutral-600"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Count in Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductList;
