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
import { motion, AnimatePresence } from "framer-motion";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");
    try {
      const result = await createCategory({ name }).unwrap();
      setName("");
      toast.success(`${result.name} created successfully`);
      refetch();
    } catch {
      toast.error("Failed to create category. Try again.");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const result = await deleteCategory(id).unwrap();
        toast.success(`${result.name} deleted successfully`);
        refetch();
      } catch {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatedName) return toast.error("Category name is required");
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatedName },
      }).unwrap();
      toast.success(`${result.name} updated successfully`);
      setModalVisible(false);
      setSelectedCategory(null);
      refetch();
    } catch {
      toast.error("Failed to update category. Try again.");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="flex justify-end mb-4">
        <AdminMenu />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-center text-2xl sm:text-3xl font-heading font-bold text-neutral-800 dark:text-white">
          Category Management
        </h1>

        {/* Form */}
        <div className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-md">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
            buttonText="Create Category"
          />
        </div>

        {/* Category List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <motion.div
              key={category._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg transition p-4 flex justify-between items-center"
            >
              <span className="text-base font-semibold text-neutral-700 dark:text-white">
                {category.name}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setModalVisible(true);
                    setUpdatedName(category.name);
                  }}
                  className="bg-primary text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-lg w-11/12 sm:w-[400px] p-6 shadow-xl"
            >
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
                  Edit Category
                </h3>
                <button
                  onClick={() => setModalVisible(false)}
                  className="text-2xl font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  &times;
                </button>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter new name"
                />
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setModalVisible(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCategory}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryList;
