import { PlusCircle } from "lucide-react";
import CreateListingForm from "../create/_components/ListingForm";

export default function CreateListing() {
  const categories = [
    "Art",
    "Collectibles",
    "Electronics",
    "Fashion",
    "Furniture",
    "Jewelry",
    "Music",
    "Accessories",
    "Home Decor",
    "Books",
    "Sports",
    "Toys",
    "Vehicles",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <PlusCircle className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Listing
          </h1>
        </div>
        <CreateListingForm categories={categories} />
      </div>
    </div>
  );
}
