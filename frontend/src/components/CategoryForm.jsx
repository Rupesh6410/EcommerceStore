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
      className="w-full max-w-md mx-auto p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 shadow-md space-y-4"
    >
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter category name"
        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Button Group */}
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-secondary transition font-medium"
        >
          {buttonText}
        </button>
        {handleDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-yellow-600 transition font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
