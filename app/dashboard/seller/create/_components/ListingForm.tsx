"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { v4 as uuidv4 } from "uuid";
import {
  Camera,
  Calendar,
  Clock,
  DollarSign,
  Info,
  X,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/supabase";

interface ListingFormProps {
  categories: string[];
}

export default function ListingForm({ categories }: ListingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Art",
    condition: "new",
    startingPrice: 0,
    duration: 7,
    startDateTime: "",
    images: [] as File[],
  });

  const conditions = [
    { value: "new", label: "New" },
    { value: "like_new", label: "Like New" },
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
  ];

  const durations = [
    { value: 1, label: "1 day" },
    { value: 3, label: "3 days" },
    { value: 5, label: "5 days" },
    { value: 7, label: "7 days" },
    { value: 10, label: "10 days" },
    { value: 14, label: "14 days" },
    { value: 30, label: "30 days" },
  ];

  //   const shippingMethods = [
  //     { value: "standard", label: "Standard Shipping" },
  //     { value: "express", label: "Express Shipping" },
  //     { value: "local_pickup", label: "Local Pickup" },
  //     { value: "freight", label: "Freight Shipping" },
  //   ];s

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));

      // Show preview of the first image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    if (index === 0) {
      setPreviewImage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically:
      // 1. Upload images to storage
      // 2. Create the auction listing
      // 3. Handle success/error

      const uploadImages = async (formData: any) => {
        const uploadedImageLinks = await Promise.all(
          formData.images.map(async (image) => {
            const fileName = `${uuidv4()}-${image.name}`;

            const { data, error } = await supabase.storage
              .from("item-images")
              .upload(fileName, image);

            if (error) {
              console.log("Upload Error:", error);
              return null; // Return null for failed uploads
            }

            // Get the public URL of the uploaded image
            const { data: publicUrlData } = supabase.storage
              .from("item-images")
              .getPublicUrl(fileName);

            return publicUrlData.publicUrl;
          })
        );

        // Remove null values (failed uploads)
        const imageLinks = uploadedImageLinks.filter((url) => url !== null);

        return imageLinks;
      };

      const imageLinks = await uploadImages(formData);
      console.log(imageLinks);

      const response = await fetch("http://localhost:3000/api/list-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          condition: formData.condition,
          startingPrice: formData.startingPrice,
          duration: formData.duration,
          startDateTime: new Date(formData.startDateTime).toISOString(),
          imageLinks: imageLinks,
        }),
      });

      console.log(response);

      router.push("/dashboard/seller");
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-black">
      {/* Basic Information */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="mt-1 block w-full p-2 text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                {categories.map((category) => (
                  <option
                    className="text-black"
                    key={category}
                    value={category.toLowerCase()}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-medium text-gray-700"
              >
                Condition
              </label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    condition: e.target.value,
                  }))
                }
                className="mt-1 block w-full p-2 rounded-md text-black bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                {conditions.map((condition) => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Images</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="images"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload images</span>
                  <input
                    id="images"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required={formData.images.length === 0}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startingPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Starting Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="startingPrice"
                min="0"
                step="0.01"
                value={formData.startingPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startingPrice: parseFloat(e.target.value) || 0,
                  }))
                }
                className="block w-full text-black pl-10 pr-12 sm:text-sm p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Duration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Listing Duration
            </label>
            <select
              id="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  duration: parseInt(e.target.value, 10) || 0,
                }))
              }
              className="mt-1 block w-full text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              {durations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="startDateTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time and Date
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              value={formData.startDateTime}
              required
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDateTime: e.target.value,
                }))
              }
              className="mt-1 block w-full text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Shipping */}
      {/* <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="shippingMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Method
            </label>
            <select
              id="shippingMethod"
              value={formData.shippingMethod}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shippingMethod: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              {shippingMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="shippingPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="shippingPrice"
                min="0"
                step="0.01"
                value={formData.shippingPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shippingPrice: e.target.value,
                  }))
                }
                className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Item Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div> */}

      {/* Payment & Returns */}
      {/* <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Payment & Returns
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accepted Payment Methods
            </label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <label key={method.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={method.value}
                    checked={formData.paymentMethods.includes(method.value)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        paymentMethods: e.target.checked
                          ? [...prev.paymentMethods, value]
                          : prev.paymentMethods.filter((m) => m !== value),
                      }));
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {method.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="returnPolicy"
              className="block text-sm font-medium text-gray-700"
            >
              Return Policy
            </label>
            <select
              id="returnPolicy"
              value={formData.returnPolicy}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  returnPolicy: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              {returnPolicies.map((policy) => (
                <option key={policy.value} value={policy.value}>
                  {policy.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div> */}

      {/* Form Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Creating Listing...
              </>
            ) : (
              "Create Listing"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
