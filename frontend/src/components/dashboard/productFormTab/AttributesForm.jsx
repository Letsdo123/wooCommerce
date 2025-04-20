import { Controller } from "react-hook-form";

function AttributesForm({ control, errors }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-12 rounded-none rounded-l-md"
                  placeholder="Enter weight"
                  min="0"
                />
              )}
            />
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="rounded-none rounded-r-md border-l-0"
                >
                  <option value="">Unit</option>
                  <option value="g">Grams (g)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="ml">Milliliters (ml)</option>
                  <option value="l">Liters (l)</option>
                  <option value="pcs">Pieces (pcs)</option>
                </select>
              )}
            />
          </div>
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Packaging Type
          </label>
          <Controller
            name="packagingType"
            control={control}
            rules={{ required: "Packaging type is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Select packaging type"
              >
                <option value="">Select packaging type</option>
                <option value="Box">Box</option>
                <option value="Carton">Carton</option>
                <option value="Packet">Packet</option>
                <option value="Pouch">Pouch</option>
                <option value="Other">Other</option>
              </select>
            )}
          />
          {errors.packagingType && (
            <p className="text-red-500 text-sm">
              {errors.packagingType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <Controller
            name="expiryDate"
            control={control}
            rules={{ required: "Expiry date is required",type: "date" }}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className="mt-1 block w-full"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 block w-full"
                placeholder="Enter product color"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Material
          </label>
          <Controller
            name="material"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-1 block w-full"
                placeholder="Enter product material"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dimensions
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500">Length</label>
            <Controller
              name="dimensions.length"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="mt-1 block w-full"
                  placeholder="Length"
                  min="0"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Width</label>
            <Controller
              name="dimensions.width"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="mt-1 block w-full"
                  placeholder="Width"
                  min="0"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Height</label>
            <Controller
              name="dimensions.height"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="mt-1 block w-full"
                  placeholder="Height"
                  min="0"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Unit</label>
            <Controller
              name="dimensions.unit"
              control={control}
              render={({ field }) => (
                <select 
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Select unit"
                >
                  <option value="">Select unit</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="m">Meters (m)</option>
                  <option value="in">Inches (in)</option>
                  <option value="ft">Feet (ft)</option>
                </select>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttributesForm;