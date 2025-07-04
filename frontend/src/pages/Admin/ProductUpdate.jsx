import AdminMenu from "./AdminMenu";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("name", name);
      updatedData.append("description", description);
      updatedData.append("price", price);
      updatedData.append("category", category);
      updatedData.append("image", image);
      updatedData.append("quantity", quantity);
      updatedData.append("brand", brand);
      updatedData.append("countInStock", stock);

      await updateProduct({ productId: id, updatedProduct: updatedData }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error("Update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 sm:p-10 bg-white shadow-lg rounded-2xl">
      <div className="flex justify-end mb-4">
        <AdminMenu />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-neutral-800 text-center">
        Update Product
      </h2>

      {image && (
        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt="Preview"
            className="w-48 h-48 object-cover border-2 border-dashed rounded-xl"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Upload Image */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
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
          <label className="text-sm font-medium text-neutral-700">Name</label>
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
          <label className="text-sm font-medium text-neutral-700">Price</label>
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
          <label className="text-sm font-medium text-neutral-700">Quantity</label>
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
          <label className="text-sm font-medium text-neutral-700">Brand</label>
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
          <label className="text-sm font-medium text-neutral-700">Count In Stock</label>
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
          <label className="text-sm font-medium text-neutral-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="text-sm font-medium text-neutral-700">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 mt-6 flex justify-start gap-4">
          <button
            type="submit"
            className="w-28 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-28 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
