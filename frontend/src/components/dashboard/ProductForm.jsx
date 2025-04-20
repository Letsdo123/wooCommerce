import { Box, DollarSign, Eye, Package, Save, Tag, Search, Layers } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import BasicInfoForm from "./productFormTab/BasicInfoForm";
import PricingForm from "./productFormTab/PricingForm";
import AttributesForm from "./productFormTab/AttributesForm";
import SEOForm from "./productFormTab/SEOForm";
import InventoryForm from "./productFormTab/InventoryForm";
import { useGenerateUploadUrlMutation } from "../../features/auth/authApi";
import uploadImageUrl from "../../utils/imageUpload";
import Loader from "../../pages/public/Loader";
import { useCreateProductMutation } from "../../features/product/productApi";
import useToast from "../../utils/toastNotofication";

function ProductForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const [generateUploadUrl] = useGenerateUploadUrlMutation();
  const [createProduct, { isSuccess, isLoading, isError }] = useCreateProductMutation();
  const [isUploading, setIsUploading] = useState(false);
  const {showSuccess,showError} = useToast();
  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Basic Info
      name: "",
      description: "",
      brand: "",
      sku: "",
      images: [],
      thumbnail: "",
      tags: [],
      slug: "",
      category: "",
      subCategory: "",
      vendor: "",
      logistics: "",
      isActive: true,

      // Pricing
      mrp: "",
      price: "",
      discount: 0,
      finalPrice: "",
      taxPercentage: 0,
      bulkDiscounts: [{ minQuantity: "", discount: "" }],
      specialOffer: false,
      couponCodes: [""],

      // Attributes
      weight: "",
      unit: "",
      packagingType: "",
      expiryDate: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
      },
      color: "",
      material: "",

      // SEO
      keywords: "",
      seoSlug: "",

      // Inventory
      stock: "",
      stockStatus: "In Stock",
      soldCount: 0,
      restockDate: "",
    },
  });
  const getTabWiseData = (data) => {
    return {
      basic: {
        name: data.name,
        description: data.description,
        brand: data.brand,
        sku: data.sku,
        images: [],
        thumbnail: null,
        tags: data.tags,
        // slug: data.slug,
        subCategory: '67f601860ea554d82b949626',
        seller: null,
        logistics: null,
        isActive: data.isActive,
      },
      pricing: {
        mrp: data.mrp,
        price: data.price,
        discount: data.discount,
        finalPrice: data.finalPrice,
        taxPercentage: data.taxPercentage,
        bulkDiscounts: data.bulkDiscounts,
        specialOffer: data.specialOffers,
        couponCodes: data.couponCodes,
      },
      attributes: {
        weight: data.weight,
        unit: data.unit,
        packagingType: data.packagingType,
        expiryDate: data.expiryDate,
        dimensions: data.dimensions,
        color: data.color,
        material: data.material,
      },
      seo: {
        keywords: data.keywords,
        slug: data.seoSlug,
      },
      inventory: {
        stock: data.stock,
        stockStatus: data.stockStatus,
        soldCount: data.soldCount,
        restockDate: data.restockDate,
      },
    };
  };
  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      // here we are getting the tab wise data
      // and then we will upload the images to the cloud storage
      const tabWiseData = getTabWiseData(data);
      const images = data.images;
      // Upload images to cloud storage and get URLs
      if (!images) return null;
      const uploadAllProductsImages = await Promise.all(
        Object.entries(images).map(async ([key, file]) => {
          // Generate timestamp
          const timestamp = Math.floor(Date.now() / 1000);
          // Call mutation to get signed URL
          const { data } = await generateUploadUrl({
            folder: 'products_images',
            timestamp,
            context: key
          });
          return await uploadImageUrl(file.file, key, data)
        })
      )
      const updatedProductsImages = uploadAllProductsImages?.map((docs) => {
        return {
          documentType: docs.context.custom.document_type,
          publicId: docs.public_id,
          fileType: docs.resource_type,
        }
      })
      // elete tabWiseData.basic.images;

      // Now this is for the thumbnail image
      const thumbnail = data.thumbnail;
      const thumbnailTimestamp = Math.floor(Date.now() / 1000);
      const { data: thumbnailData } = await generateUploadUrl({
        folder: 'products_images',
        timestamp: thumbnailTimestamp,
        context: "thumbnail"
      });
      const thumbnailUrl = await uploadImageUrl(thumbnail.file, "thumbnail", thumbnailData)
      // delete tabWiseData.basic.thumbnail;

      const createProductData = {
        ...tabWiseData,
        images: updatedProductsImages,
        thumbnail: {
          publicId: thumbnailUrl.public_id,
          fileType: thumbnailUrl.resource_type,
          documentType: "thumbnail",
        },
      }

      const { data: productCreationStatus } = await createProduct(createProductData);
      setIsUploading(false);
      if (isSuccess) {
        console.log("Product created successfully:", productCreationStatus);
        showSuccess("Product created successfully");
      }
      // console.log("Updated documents", updatedDocuments);
      // console.log("Tab-wise data:", tabWiseData);
      // console.log("Form submitted:", data);
    } catch (error) {
      setIsUploading(false);
      showError("Error creating product");
      console.error("Error uploading images:", error);
    }
  };

  const TabButton = ({ tab, icon: Icon, label }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${activeTab === tab
        ? "bg-green-500 text-white"
        : "text-gray-600 hover:bg-green-50"
        }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {label}
    </button>
  );

  return (
    isUploading ? <Loader /> : (
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
                  className="flex items-center px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-300 transition-colors"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Preview
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center px-4 py-2 bg-white text-green-600 rounded-md hover:bg-green-50 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Product
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
                  <TabButton tab="basic" icon={Package} label="Basic Info" />
                  <TabButton tab="pricing" icon={DollarSign} label="Pricing" />
                  <TabButton tab="attributes" icon={Box} label="Attributes" />
                  <TabButton tab="seo" icon={Search} label="SEO" />
                  <TabButton tab="inventory" icon={Layers} label="Inventory" />
                </div>

                {/* Tab Content */}
                {activeTab === "basic" && (
                  <BasicInfoForm
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                  />
                )}
                {activeTab === "pricing" && (
                  <PricingForm
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                  />
                )}
                {activeTab === "attributes" && (
                  <AttributesForm
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                  />
                )}
                {activeTab === "seo" && (
                  <SEOForm
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                  />
                )}
                {activeTab === "inventory" && (
                  <InventoryForm
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    errors={errors}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>)
  );
}

export default ProductForm;