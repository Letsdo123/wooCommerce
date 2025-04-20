import { Controller } from "react-hook-form";

function InventoryForm({ control, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Stock</label>
        <Controller
          name="stock"
          control={control}
          rules={{ required: "Stock is required",type: "number" }}  
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="mt-1 block w-full"
              placeholder="Enter stock quantity"
            />
          )}
        />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Stock Status
        </label>
        <Controller
          name="stockStatus"
          control={control}
          render={({ field }) => (
            <select {...field} className="mt-1 block w-full">
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sold Count
        </label>
        <Controller
          name="soldCount"
          control={control}
          rules={{ required: "Sold count is required",type: "number" }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="mt-1 block w-full"
              placeholder="Enter sold count"
            />
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Restock Date
        </label>
        <Controller
          name="restockDate"
          control={control}
          rules={{ required: "Restock date is required",type: "date" }}
          render={({ field }) => (
            <input {...field} type="date" className="mt-1 block w-full" />
          )}
        />
      </div>
    </div>
  );
}

export default InventoryForm;