import { useState } from "react"
import { useNavigate } from "react-router"
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice"
import { toast } from "react-toastify"
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import AdminMenu from "./AdminMenu"

const ProductList = () => {
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [brand, setBrand] = useState("")
  const [stock, setStock] = useState(0)
  const [imageUrl, setImageUrl] = useState(null)

  const navigate = useNavigate()

  const [createProduct] = useCreateProductMutation()
  const [uploadProductImage] = useUploadProductImageMutation()
  const { data: categories } = useFetchCategoriesQuery()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        
        const productData= new FormData()
        productData.append("name",name)
        productData.append("description",description)
        productData.append("price",price)
        productData.append("category",category)
        productData.append("image" , image)
        productData.append("quantity",quantity)
        productData.append("brand",brand)
        productData.append("countInStock",stock)
        
        const res = await createProduct(productData).unwrap()
        toast.success("Product Created Successfully")
        navigate("/")

    } catch (error) {
        console.error(error);
        toast.error("Product Create Failed , Try Again");
        
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res.image);
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  
  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex justify-end">
            <AdminMenu />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Create Product
        </h2>

        {imageUrl && (
          <div className="flex justify-center mb-4">
            <div className="w-auto h-auto border-2 border-dashed rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Product Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              {image ? image.name : "Upload Image"}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Brand
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Count In Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
          <div className="col-span-2">
            <label htmlFor="" className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <select
                  placeholder="Choose Category"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
          </div>

          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>

        
        <div className="mt-6 text-center">
          <button
            className="w-full md:w-1/2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductList
