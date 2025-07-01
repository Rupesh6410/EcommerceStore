import React, { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories , refetch} = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteCategory ] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  // Create Category Handler
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} created successfully`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category. Try Again");
    }
  };

  // Delete Category Handler
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
       const result =await deleteCategory(id);
        toast.success(`${result.name} deleted successfully`);
        refetch();
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

//   update category handler
const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatedName) {
      toast.error("Category name is required");
      return;
    }
  
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatedName },
      }).unwrap();
  
      if (result.error) {
        toast.error(result.error);
      } else {
        setModalVisible(false);
        setSelectedCategory(null);
        toast.success(`${result.name} updated successfully`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category. Try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-end mb-4">
        <AdminMenu />
      </div>
    
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-6 text-center">Category Management</h1>

        
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
            buttonText="Create Category"
          />
        </div>

        {/* Category List */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex justify-between items-center w-full"
            >
              <span className="text-lg font-medium">{category.name}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setModalVisible(true);
                    setUpdatedName(category.name);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
{modalVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6">
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-xl font-semibold">Edit Category</h3>
        <button
          onClick={() => setModalVisible(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>

      {/* Modal Body */}
      <div className="my-4">
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Update category name"
        />
      </div>

      {/* Modal Footer */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setModalVisible(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default CategoryList;

