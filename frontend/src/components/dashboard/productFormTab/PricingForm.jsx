import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { X } from "lucide-react";

function PricingForm({ control, setValue, getValues, errors }) {
  // Watch specific fields
  const discount = useWatch({ control, name: "discount" });
  const price = useWatch({ control, name: "price" });
  const taxPercentage = useWatch({ control, name: "taxPercentage" });

  const calculateFinalPrice = () => {
    const basePrice = (price || 0) - ((price || 0) * (discount || 0)) / 100;
    const taxAmount = (basePrice * (taxPercentage || 0)) / 100;
    return (basePrice + taxAmount).toFixed(2);
  };

  setValue("finalPrice", calculateFinalPrice());

  const { fields: bulkDiscounts, append: addBulkDiscount, remove: removeBulkDiscount } = useFieldArray({
    control,
    name: "bulkDiscounts",
  });

  const { fields: specialOffers, append: addSpecialOffer, remove: removeSpecialOffer } = useFieldArray({
    control,
    name: "specialOffers",
  });

  const { fields: couponCodes, append: addCouponCode, remove: removeCouponCode } = useFieldArray({
    control,
    name: "couponCodes",
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">MRP</label>
          <Controller
            name="mrp"
            control={control}
            rules={{ required: "MRP is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="mt-1 block w-full"
                placeholder="Enter MRP"
                rules={{ required: true,type: "number" }}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? '' : parseFloat(value) || 0);
                }}
              />
            )}
          />
          {errors.mrp && (
            <p className="text-red-500 text-sm">{errors.mrp.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Selling Price
          </label>
          <Controller
            name="price"
            control={control}
            rules={{ required: "Selling price is required",type: "number" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="mt-1 block w-full"
                placeholder="Enter selling price"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? '' : parseFloat(value) || 0);
                }}
              />
            )}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount (%)
          </label>
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="mt-1 block w-full"
                placeholder="Enter discount percentage"
                rules={{ required: true,type: "number" }}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === '' ? '' : parseFloat(value) || 0);
                }}
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Final Price
        </label>
        <input
          type="text"
          value={calculateFinalPrice()}
          rules={{ required: true,type: "number" }}
          readOnly
          className="mt-1 block w-full bg-gray-50"
          disabled
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tax Percentage (%)
        </label>
        <Controller
          name="taxPercentage"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="mt-1 block w-full"
              placeholder="Enter tax percentage"
              rules={{ required: true,type: "number" }}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === '' ? '' : parseFloat(value) || 0);
              }}
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bulk Discounts
        </label>
        {bulkDiscounts.map((discount, index) => (
          <div key={discount.id} className="flex gap-4 items-center mb-4">
            <Controller
              name={`bulkDiscounts.${index}.minQuantity`}
              control={control}
              rules={{ required: "Minimum quantity is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="flex-1"
                  placeholder="Min Quantity"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : parseFloat(value) || 0);
                  }}
                />
              )}
            />
            <Controller
              name={`bulkDiscounts.${index}.discount`}
              control={control}
              rules={{ required: "Discount is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="flex-1"
                  placeholder="Discount (%)"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : parseFloat(value) || 0);
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={() => removeBulkDiscount(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addBulkDiscount({ minQuantity: 0, discount: 0 })}
          className="text-green-600 hover:text-green-500"
        >
          + Add Bulk Discount
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Special Offers
        </label>
        {specialOffers.map((offer, index) => (
          <div key={offer.id} className="flex gap-4 items-center mb-4">
            <Controller
              name={`specialOffers.${index}.offer`}
              control={control}
              rules={{ required: "Offer is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="flex-1"
                  placeholder="Special Offer"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : value);
                  }}
                />
              )}
            />
            <Controller
              name={`specialOffers.${index}.discount`}
              control={control}
              rules={{ required: "Discount is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="flex-1"
                  placeholder="Discount (%)"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : parseFloat(value) || 0);
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={() => removeSpecialOffer(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addSpecialOffer({ offer: "", discount: 0 })}
          className="text-green-600 hover:text-green-500"
        >
          + Add Special Offer
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cupon Codes
        </label>
        {couponCodes.map((code, index) => (
          <div key={code.id} className="flex gap-4 items-center mb-4">
            <Controller
              name={`couponCodes.${index}.code`}
              control={control}
              rules={{ required: "Code is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="flex-1"
                  placeholder="Coupon Code"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : value);
                  }}
                />
              )}
            />
            <Controller
              name={`couponCodes.${index}.discount`}
              control={control}
              rules={{ required: "Discount is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="flex-1"
                  placeholder="Discount (%)"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : parseFloat(value) || 0);
                  }}
                />
              )}
            />
            <Controller
              name={`couponCodes.${index}.validFrom`}
              control={control}
              rules={{ required: "Valid From is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="flex-1"
                  placeholder="Valid From"
                  rules={{ required: true,type: "date" }}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : value);
                  }}
                />
              )}
            />
            <Controller
              name={`couponCodes.${index}.validTill`}
              control={control}
              rules={{ required: "Valid Till is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="flex-1"
                  placeholder="Valid Till"
                  rules={{ required: true,type: "date" }}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? '' : value);
                  }}
                />
              )}
            />
            <button
              type="button"
              onClick={() => removeCouponCode(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addCouponCode({ code: "", discount: 0, validFrom: "", validTill: "" })
          }
          className="text-green-600 hover:text-green-500"
        >
          + Add Coupon Code
        </button>
      </div>
    </div>
  );
}

export default PricingForm;