import { Controller } from "react-hook-form";

function SEOForm({ control, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Keywords
        </label>
        <Controller
          name="keywords"
          control={control}
          rules={{ required: "Keywords are required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full"
              placeholder="Enter SEO keywords"
            />
          )}
        />
        {errors.keywords && (
          <p className="text-red-500 text-sm">{errors.keywords.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <Controller
          name="seoSlug"
          control={control}
          rules={{ required: "Slug is required" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="mt-1 block w-full"
              placeholder="Enter SEO-friendly slug"
            />
          )}
        />
        {errors.seoSlug && (
          <p className="text-red-500 text-sm">{errors.seoSlug.message}</p>
        )}
      </div>
    </div>
  );
}

export default SEOForm;