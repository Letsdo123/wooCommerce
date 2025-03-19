import { useForm, Controller } from "react-hook-form";
import { useCreateCategoryMutation } from "../../features/product/categoryApi";

const ProductSubCategoryForm = ({ type = "subcategory", onSubmit }) => {
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: "",
    },
  });

  const availablePermissions = [
    { id: "manage_users", name: "Manage Users" },
    { id: "manage_products", name: "Manage Products" },
    { id: "manage_orders", name: "Manage Orders" },
    { id: "view_analytics", name: "View Analytics" },
    { id: "manage_settings", name: "Manage Settings" },
  ];

  const onSubmitHandler = async (data) => {
    try {
      await createCategory(data).unwrap();
      reset(); // Reset form after successful submission
      onSubmit?.(data); // Pass data to parent if needed
    } catch (err) {
      console.error("Error creating sub category:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-xl font-bold mb-6">
        Add New {type === "subcategory" ? "Sub Category" : "Permission"}
      </h2>

      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={`Enter ${type} name`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={`Enter ${type} description`}
            rows="3"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Status Field */}
        <div>
          <label className="form-label">Status *</label>
          <select
            className="form-input"
            {...register("isActive", {
              required: "Status is required",
            })}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.isActive && (
            <p className="text-red-500 text-sm">{errors.isActive.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Category *</label>
          <select
            className="form-input"
            {...register("category", {
              required: "category is required",
            })}
          >
            <option value="">Select Category</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm">
            {error.data?.message || "Something went wrong"}
          </p>
        )}
      </div>
    </form>
  );
};

export default ProductSubCategoryForm;
