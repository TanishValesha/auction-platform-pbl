"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useUserStore from "@/store";

type UserType = "BUYER" | "SELLER";
type AuthView = "SIGN_IN" | "REGISTER";

interface FormData {
  userType: UserType;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  companyName?: string;
  businessType?: string;
}

interface SignInData {
  email: string;
  password: string;
}

const SignInForm = ({
  onSubmit,
  signInData,
  onInputChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  signInData: SignInData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        <Mail className="inline-block w-4 h-4 mr-2" />
        Email
      </label>
      <input
        type="email"
        name="email"
        value={signInData.email}
        onChange={onInputChange}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        <Lock className="inline-block w-4 h-4 mr-2" />
        Password
      </label>
      <input
        type="password"
        name="password"
        value={signInData.password}
        onChange={onInputChange}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 focus:ring-blue-500 border-gray-300 rounded text-black"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-900"
        >
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
          Forgot your password?
        </a>
      </div>
    </div>

    <button
      type="submit"
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Sign in
    </button>
  </form>
);

const RegisterForm = ({
  onSubmit,
  formData,
  onInputChange,
  onUserTypeChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  formData: FormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onUserTypeChange: (type: UserType) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="flex gap-4 p-2 bg-gray-50 rounded-lg mb-6">
      <button
        type="button"
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          formData.userType === "BUYER"
            ? "bg-indigo-600 text-white"
            : "bg-transparent text-gray-600"
        }`}
        onClick={() => onUserTypeChange("BUYER")}
      >
        <User className="inline-block w-4 h-4 mr-2" />
        Buyer
      </button>
      <button
        type="button"
        className={`flex-1 py-2 px-4 rounded-md transition-all ${
          formData.userType === "SELLER"
            ? "bg-indigo-600 text-white"
            : "bg-transparent text-gray-600"
        }`}
        onClick={() => onUserTypeChange("SELLER")}
      >
        <Building2 className="inline-block w-4 h-4 mr-2" />
        Seller
      </button>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onInputChange}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onInputChange}
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        <Mail className="inline-block w-4 h-4 mr-2" />
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        <Lock className="inline-block w-4 h-4 mr-2" />
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onInputChange}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        <Phone className="inline-block w-4 h-4 mr-2" />
        Phone Number
      </label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={onInputChange}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">
        <MapPin className="inline-block w-4 h-4 mr-2" />
        Address
      </label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={onInputChange}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
    </div>

    {formData.userType === "SELLER" && (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Building2 className="inline-block w-4 h-4 mr-2" />
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={onInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <Briefcase className="inline-block w-4 h-4 mr-2" />
            Business Type
          </label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={onInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
            required
          />
        </div>
      </>
    )}

    <button
      type="submit"
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Create Account
    </button>
  </form>
);

function App() {
  const [view, setView] = useState<AuthView>("SIGN_IN");
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userType: "BUYER",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    companyName: "",
    businessType: "",
  });
  const [signInData, setSignInData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const setUser = useUserStore((state) => state.setUser);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (type: UserType) => {
    setFormData((prev) => ({ ...prev, userType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", view === "REGISTER" ? formData : signInData);
    e.preventDefault();

    let response;
    if (view == "REGISTER") {
      response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      toast.success("Registration successful!");
      setFormData({
        address: "",
        businessType: "",
        companyName: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        userType: "BUYER",
      });
    } else {
      response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });
      toast.success("Login successful!");
      // setSignInData({
      //   email: "",
      //   password: "",
      // });
    }
    let currentUser;
    if (view == "REGISTER") {
      const currentUserResponse = await fetch(
        `/api/getCurrentUser/${formData.email}`
      );
      currentUser = await currentUserResponse.json();
      setUser(currentUser);
    } else {
      const currentUserResponse = await fetch(
        `/api/getCurrentUser/${signInData.email}`
      );
      currentUser = await currentUserResponse.json();
      setUser(currentUser);
    }

    if (response?.status === 201) {
      if (currentUser.userType === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (currentUser.userType === "SELLER") {
        router.push("/dashboard/seller");
      } else {
        router.push("/dashboard/buyer");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="relative w-full flex flex-col items-center justify-center text-white p-12 space-y-8">
          <h1 className="text-5xl font-bold text-center">
            Welcome to AuctionPro
          </h1>
          <p className="text-xl text-center max-w-md">
            Join our community of buyers and sellers in the world&#39;s most
            trusted online auction platform
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12 w-full max-w-lg">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">10K+</h3>
              <p className="text-sm opacity-80">Active Auctions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">50K+</h3>
              <p className="text-sm opacity-80">Happy Users</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">99%</h3>
              <p className="text-sm opacity-80">Successful Sales</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-2">24/7</h3>
              <p className="text-sm opacity-80">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {view === "SIGN_IN"
                ? "Welcome Back"
                : "Join Our Auction Platform"}
            </h2>

            {view === "SIGN_IN" ? (
              <SignInForm
                onSubmit={handleSubmit}
                signInData={signInData}
                onInputChange={handleSignInInputChange}
              />
            ) : (
              <RegisterForm
                onSubmit={handleSubmit}
                formData={formData}
                onInputChange={handleInputChange}
                onUserTypeChange={handleUserTypeChange}
              />
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              {view === "SIGN_IN" ? (
                <>
                  Don&#39;t have an account?{" "}
                  <button
                    onClick={() => setView("REGISTER")}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Register now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setView("SIGN_IN")}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
