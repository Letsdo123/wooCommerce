import { useForm, Controller } from "react-hook-form";
import { useCreateRoleMutation } from "../../features/auth/authApi";

const RolePermissionForm = ({ type = "role", onSubmit }) => {
  const [createRole, { isLoading, error }] = useCreateRoleMutation();
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
      await createRole(data).unwrap();
      reset(); // Reset form after successful submission
      onSubmit?.(data); // Pass data to parent if needed
    } catch (err) {
      console.error("Error creating role:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="bg-white rounded-lg shadow p-6"
    >
      <h2 className="text-xl font-bold mb-6">
        Add New {type === "role" ? "Role" : "Permission"}
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={`Enter ${type} description`}
            rows="3"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Permissions Field (Only for Roles) */}
        {/* {type === "role" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <Controller
                  key={permission.id}
                  name="permissions"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={permission.id}
                        checked={field.value.includes(permission.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          field.onChange(
                            checked
                              ? [...field.value, permission.id]
                              : field.value.filter((id) => id !== permission.id)
                          );
                        }}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{permission.name}</span>
                    </label>
                  )}
                />
              ))}
            </div>
          </div>
        )} */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error.data?.message || "Something went wrong"}</p>}
      </div>
    </form>
  );
};

export default RolePermissionForm;
