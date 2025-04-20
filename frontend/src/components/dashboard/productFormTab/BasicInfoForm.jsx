import { Controller } from "react-hook-form";
import { Upload, X, Tag } from "lucide-react";
import { useDropzone } from "react-dropzone";

function BasicInfoForm({ control, setValue, getValues, errors }) {
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const currentImages = getValues("images") || [];
    setValue("images", [...currentImages, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  const removeImage = (index) => {
    const currentImages = getValues("images") || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue("images", updatedImages);
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value) {
      e.preventDefault();
      const currentTags = getValues("tags") || [];
      setValue("tags", [...currentTags, e.target.value]);
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    const currentTags = getValues("tags") || [];
    const updatedTags = currentTags.filter((_, i) => i !== index);
    setValue("tags", updatedTags);
  };

  const handleThumbnailChange = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const thumbnail = {
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      };
      setValue("thumbnail", thumbnail);
    }
  };

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({
    onDrop: handleThumbnailChange,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const removeThumbnail = () => {
    setValue("thumbnail", null);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Product name is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full"
              placeholder="Enter product name"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Brand</label>
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full"
              placeholder="Enter brand name"
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <textarea
              {...field}
              rows="4"
              className="mt-1 block w-full"
              placeholder="Enter product description"
            />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Images
        </label>
        <div
          {...getRootProps()}
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
            isDragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
        >
          <div className="space-y-2 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <input {...getInputProps()} />
              <p className="pl-1">
                <span className="text-green-500 font-medium">Click to upload</span> or drag and drop
              </p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {field.value?.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Thumbnail
        </label>
        <div
          {...getThumbnailRootProps()}
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg"
        >
          <div className="space-y-2 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <input {...getThumbnailInputProps()} />
              <p className="pl-1">
                <span className="text-green-500 font-medium">Click to upload</span> or drag and drop
              </p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) =>
            field.value ? (
              <div className="mt-4 relative group">
                <img
                  src={field.value.preview}
                  alt="Thumbnail Preview"
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-1 flex flex-wrap gap-2">
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <>
                {field.value?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </>
            )}
          />
          <input
            type="text"
            placeholder="Press Enter to add tags"
            onKeyPress={handleTagInput}
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <Controller
          name="slug"
          control={control}
          rules={{ required: "Slug is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full"
              placeholder="Enter product slug"
            />
          )}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">SKU</label>
        <Controller
          name="sku"
          control={control}
          rules={{ required: "SKU is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full"
              placeholder="Enter SKU"
            />
          )}
        />
        {errors.sku && (
          <p className="text-red-500 text-sm">{errors.sku.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subcategory
        </label>
        <Controller
          name="subCategory"
          control={control}
          rules={{ required: "Subcategory is required" }}
          render={({ field }) => (
            <select {...field} className="mt-1 block w-full">
              <option value="">Select a subcategory</option>
              <option value="subcategory1">Subcategory 1</option>
              <option value="subcategory2">Subcategory 2</option>
            </select>
          )}
        />
        {errors.subCategory && (
          <p className="text-red-500 text-sm">{errors.subCategory.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Seller</label>
        <Controller
          name="seller"
          control={control}
          rules={{ required: "Seller is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full"
              placeholder="Enter seller information"
            />
          )}
        />
        {errors.seller && (
          <p className="text-red-500 text-sm">{errors.seller.message}</p>
        )}
      </div>
    </div>
  );
}

export default BasicInfoForm;