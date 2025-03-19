import { Box, DollarSign, Eye, ImageIcon, Package, Save, Tag, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


function ProductForm() {
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState({
      // Basic Info
      name: '',
      description: '',
      brand: '',
      sku: '',
      images: [],
      thumbnail: '',
      tags: [],
      slug: '',
      category: '',
      subCategory: '',
      vendor: '',
      logistics: '',
      isActive: true,
      
      // Pricing
      mrp: '',
      price: '',
      discount: 0,
      finalPrice: '',
      taxPercentage: 0,
      bulkDiscounts: [{ minQuantity: '', discount: '' }],
      specialOffer: false,
      couponCodes: [''],
      
      // Attributes
      weight: '',
      unit: '',
      packagingType: '',
      expiryDate: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      },
      color: '',
      material: ''
    });
  
    const [previewMode, setPreviewMode] = useState(false);
  
    const onDrop = useCallback((acceptedFiles) => {
      const newImages = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif']
      }
    });
  
    const removeImage = (index) => {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleDimensionChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [name]: value
        }
      }));
    };
  
    const handleBulkDiscountChange = (index, field, value) => {
      const newBulkDiscounts = [...formData.bulkDiscounts];
      newBulkDiscounts[index] = {
        ...newBulkDiscounts[index],
        [field]: value
      };
      setFormData(prev => ({
        ...prev,
        bulkDiscounts: newBulkDiscounts
      }));
    };
  
    const addBulkDiscount = () => {
      setFormData(prev => ({
        ...prev,
        bulkDiscounts: [...prev.bulkDiscounts, { minQuantity: '', discount: '' }]
      }));
    };
  
    const removeBulkDiscount = (index) => {
      setFormData(prev => ({
        ...prev,
        bulkDiscounts: prev.bulkDiscounts.filter((_, i) => i !== index)
      }));
    };
  
    const handleCouponChange = (index, value) => {
      const newCoupons = [...formData.couponCodes];
      newCoupons[index] = value;
      setFormData(prev => ({
        ...prev,
        couponCodes: newCoupons
      }));
    };
  
    const addCoupon = () => {
      setFormData(prev => ({
        ...prev,
        couponCodes: [...prev.couponCodes, '']
      }));
    };
  
    const removeCoupon = (index) => {
      setFormData(prev => ({
        ...prev,
        couponCodes: formData.couponCodes.filter((_, i) => i !== index)
      }));
    };
  
    const handleTagInput = (e) => {
      if (e.key === 'Enter' && e.target.value) {
        e.preventDefault();
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, e.target.value]
        }));
        e.target.value = '';
      }
    };
  
    const removeTag = (indexToRemove) => {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter((_, index) => index !== indexToRemove)
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };
  
    const calculateFinalPrice = () => {
      const price = parseFloat(formData.price) || 0;
      const discount = parseFloat(formData.discount) || 0;
      return (price - (price * discount / 100)).toFixed(2);
    };
  
    const PreviewCard = () => (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="aspect-w-16 aspect-h-9 mb-4">
          {formData.images.length > 0 ? (
            <img
              src={formData.images[0].preview}
              alt={formData.name}
              className="rounded-lg object-cover w-full h-64"
            />
          ) : (
            <div className="bg-gray-100 rounded-lg flex items-center justify-center h-64">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{formData.name || 'Product Name'}</h2>
        <p className="text-gray-600 mb-4">{formData.description || 'Product description will appear here'}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>SKU: {formData.sku || 'N/A'}</span>
          <span>Price: ${calculateFinalPrice()}</span>
        </div>
      </div>
    );
  
    const TabButton = ({ tab, icon: Icon, label }) => (
      <button
        type="button"
        onClick={() => setActiveTab(tab)}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          activeTab === tab
            ? 'bg-green-500 text-white'
            : 'text-gray-600 hover:bg-green-50'
        }`}
      >
        <Icon className="h-5 w-5 mr-2" />
        {label}
      </button>
    );
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6" />
                <h1 className="text-2xl font-semibold">Add New Product</h1>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-300 transition-colors"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  {previewMode ? 'Edit Mode' : 'Preview'}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Product
                </button>
              </div>
            </div>
  
            <div className="p-6">
              {previewMode ? (
                <PreviewCard />
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Tabs */}
                  <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
                    <TabButton tab="basic" icon={Package} label="Basic Info" />
                    <TabButton tab="pricing" icon={DollarSign} label="Pricing" />
                    <TabButton tab="attributes" icon={Box} label="Attributes" />
                  </div>
  
                  {/* Basic Info Tab */}
                  {activeTab === 'basic' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <Package className="h-5 w-5 mr-2 text-green-500" />
                          Basic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="mt-1 block w-full"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Brand</label>
                            <input
                              type="text"
                              name="brand"
                              value={formData.brand}
                              onChange={handleChange}
                              className="mt-1 block w-full"
                            />
                          </div>
                        </div>
                      </div>
  
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          className="mt-1 block w-full"
                          required
                        />
                      </div>
  
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                        <div
                          {...getRootProps()}
                          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                            isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
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
                        
                        {formData.images.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.images.map((image, index) => (
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
                      </div>
  
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
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
                          <input
                            type="text"
                            placeholder="Press Enter to add tags"
                            onKeyPress={handleTagInput}
                            className="flex-1"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700">SKU</label>
                        <input
                          type="text"
                          name="sku"
                          value={formData.sku}
                          onChange={handleChange}
                          className="mt-1 block w-full"
                        />
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          className="mt-1 block w-full"
                        />
                      </div>
  
                      <div className="md:col-span-2">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Product References</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              className="mt-1 block w-full"
                              required
                            >
                              <option value="">Select a category</option>
                              <option value="fruits">Fruits</option>
                              <option value="vegetables">Vegetables</option>
                              <option value="dairy">Dairy</option>
                            </select>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                            <select
                              name="subCategory"
                              value={formData.subCategory}
                              onChange={handleChange}
                              className="mt-1 block w-full"
                              required
                            >
                              <option value="">Select a sub category</option>
                              <option value="organic">Organic</option>
                              <option value="conventional">Conventional</option>
                            </select>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Vendor</label>
                            <select
                              name="vendor"
                              value={formData.vendor}
                              onChange={handleChange}
                              className="mt-1 block w-full"
                              required
                            >
                              <option value="">Select a vendor</option>
                              <option value="vendor1">Local Farms Co.</option>
                              <option value="vendor2">Organic Producers</option>
                            </select>
                          </div>
  
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Logistics Partner</label>
                            <select
                              name="logistics"
                              value={formData.logistics}
                              onChange={handleChange}
                              className="mt-1 block w-full"
                              required
                            >
                              <option value="">Select logistics partner</option>
                              <option value="logistics1">Fast Delivery Co.</option>
                              <option value="logistics2">Express Shipping Ltd.</option>
                            </select>
                          </div>
                        </div>
                      </div>
  
                      <div className="md:col-span-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Product is active and ready for sale
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
  
                  {/* Pricing Tab */}
                  {activeTab === 'pricing' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">MRP</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="mrp"
                              value={formData.mrp}
                              onChange={handleChange}
                              className="pl-7 block w-full"
                              required
                            />
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Selling Price</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              className="pl-7 block w-full"
                              required
                            />
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                          <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
  
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Tax Percentage (%)</label>
                          <input
                            type="number"
                            name="taxPercentage"
                            value={formData.taxPercentage}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            min="0"
                          />
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Final Price</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                              type="text"
                              value={calculateFinalPrice()}
                              className="pl-7 block w-full bg-gray-50"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
  
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-medium text-gray-700">Bulk Discounts</label>
                          <button
                            type="button"
                            onClick={addBulkDiscount}
                            className="flex items-center text-sm text-green-600 hover:text-green-500"
                          >
                            + Add Bulk Discount
                          </button>
                        </div>
                        {formData.bulkDiscounts.map((discount, index) => (
                          <div key={index} className="flex gap-4 items-center mb-4">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700">Min. Quantity</label>
                              <input
                                type="number"
                                value={discount.minQuantity}
                                onChange={(e) => handleBulkDiscountChange(index, 'minQuantity', e.target.value)}
                                className="mt-1 block w-full"
                                min="1"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                              <input
                                type="number"
                                value={discount.discount}
                                onChange={(e) => handleBulkDiscountChange(index, 'discount', e.target.value)}
                                className="mt-1 block w-full"
                                min="0"
                                max="100"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeBulkDiscount(index)}
                              className="mt-6 p-2 text-red-500 hover:text-red-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
  
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="block text-sm font-medium text-gray-700">Coupon Codes</label>
                          <button
                            type="button"
                            onClick={addCoupon}
                            className="flex items-center text-sm text-green-600 hover:text-green-500"
                          >
                            + Add Coupon Code
                          </button>
                        </div>
                        {formData.couponCodes.map((coupon, index) => (
                          <div key={index} className="flex gap-4 items-center mb-4">
                            <input
                              type="text"
                              value={coupon}
                              onChange={(e) => handleCouponChange(index, e.target.value)}
                              className="flex-1"
                              placeholder="Enter coupon code"
                            />
                            <button
                              type="button"
                              onClick={() => removeCoupon(index)}
                              className="p-2 text-red-500 hover:text-red-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
  
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="specialOffer"
                          checked={formData.specialOffer}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          Mark as Special Offer
                        </label>
                      </div>
                    </div>
                  )}
  
                  {/* Attributes Tab */}
                  {activeTab === 'attributes' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Weight</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="number"
                              name="weight"
                              value={formData.weight}
                              onChange={handleChange}
                              className="flex-1 rounded-none rounded-l-md"
                              min="0"
                            />
                            <select
                              name="unit"
                              value={formData.unit}
                              onChange={handleChange}
                              className="rounded-none rounded-r-md border-l-0"
                            >
                              <option value="">Unit</option>
                              <option value="g">Grams (g)</option>
                              <option value="kg">Kilograms (kg)</option>
                              <option value="ml">Milliliters (ml)</option>
                              <option value="l">Liters (l)</option>
                              <option value="pcs">Pieces (pcs)</option>
                            </select>
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Packaging Type</label>
                          <input
                            type="text"
                            name="packagingType"
                            value={formData.packagingType}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            placeholder="e.g., Box, Bag, Container"
                          />
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                          <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                          />
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Color</label>
                          <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            placeholder="Product color"
                          />
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Material</label>
                          <input
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            placeholder="Product material"
                          />
                        </div>
                      </div>
  
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500">Length</label>
                            <input
                              type="number"
                              name="length"
                              value={formData.dimensions.length}
                              onChange={handleDimensionChange}
                              className="mt-1 block w-full"
                              min="0"
                              placeholder="cm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">Width</label>
                            <input
                              type="number"
                              name="width"
                              value={formData.dimensions.width}
                              onChange={handleDimensionChange}
                              className="mt-1 block w-full"
                              min="0"
                              placeholder="cm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">Height</label>
                            <input
                              type="number"
                              name="height"
                              value={formData.dimensions.height}
                              onChange={handleDimensionChange}
                              className="mt-1 block w-full"
                              min="0"
                              placeholder="cm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default ProductForm;