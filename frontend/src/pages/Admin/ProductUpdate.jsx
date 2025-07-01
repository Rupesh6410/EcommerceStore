import AdminMenu from './AdminMenu'
import { useState , useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom'
import { useUpdateProductMutation ,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
    useDeleteProductMutation
 } from '../../redux/api/productApiSlice'

 import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
 import { toast } from 'react-toastify'



const ProductUpdate = () => {

    const params = useParams();

    console.log(params.id)


    const  { data: productData } = useGetProductByIdQuery(params.id);
  
    console.log(productData?.category);
  
    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(
      productData?.description || ""
    );
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock || "");
  
    
    const navigate = useNavigate();
  
    
    const { data: categories = [] } = useFetchCategoriesQuery();

    console.log(categories);
    
  
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

    const uploadFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append("image" , e.target.files[0])

        try {
            const res  = await uploadProductImage(formData).unwrap();
            toast.success("Image added successfully")
            setImage(res.image)
            
        } catch (error) {
            toast.error("Image Not Added , Try Again")
            
        }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", Number(price));
        formData.append("category", category);
        formData.append("image", image);
        formData.append("quantity", Number(quantity));
        formData.append("brand", brand);
        formData.append("countInStock", Number(stock));
    
        const data = await updateProduct(params.id, formData);
    
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Product Updated Successfully");
          navigate("/admin/allproductslist");
        }
      } catch (error) {
        console.error(error);
        toast.error("Product Update Failed, Try Again");
      }
    };

      const handleDelete=async()=>{
        try {

            let answer=window.confirm("Are you sure you want to delete this product?")
            if(!answer) return;

            const {data}=await deleteProduct(params.id)
            toast.success(`${data.name} is deleted`)
            navigate("/admin/allproductslist")

            
        } catch (error) {
            toast.error("Delete Failed , Try Again")
        }
      }

  return (
    <>
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-2xl">

        <div className="flex justify-end">
        <AdminMenu />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Create Product
        </h2>

        {image && (
          <div className="flex justify-center mb-4">
            <div className="w-auto h-auto border-2 border-dashed rounded-lg overflow-hidden">
              <img
                src={image}
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

        
        <div className="mt-6 flex items-center justify-start gap-4">
  <button
    className="w-24 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    onClick={handleSubmit}
  >
    Update
  </button>

  <button
    className="w-24 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    onClick={handleDelete}
  >
    Delete
  </button>
</div>
          
        
      </div>
    </>
  )
}

export default ProductUpdate
