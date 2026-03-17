import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-6 rounded-2xl glass-card border border-white/10 space-y-5"
    >
<<<<<<< HEAD
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300 ml-1">
          Category Name
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-4 py-3 rounded-xl bg-card/60 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
=======
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter category name"
        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <div className="flex justify-end gap-2">
>>>>>>> main
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl btn-primary shadow-lg font-bold"
        >
          {buttonText}
        </button>
        {handleDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2.5 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 transition-all font-bold"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
