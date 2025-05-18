"use client";

// import React from "react";

// const Navbar = () => {
//   return (
//     <div className="w-full flex items-center justify-between">
//       <div className="text-xl font-bold">Logo</div>
//       <ul className="flex gap-6 text-sm font-mediu">
//         <li className="hover:text-blue-600 cursor-pointer">Home</li>
//         <li className="hover:text-blue-600 cursor-pointer">Products</li>
//         <li className="hover:text-blue-600 cursor-pointer">Contact</li>
//       </ul>
//       <div>User Info</div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, User, MapPin } from "lucide-react";
import Link from "next/link";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-between">
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="">
          <h1 className="text-2xl font-bold text-amazon-orange">ShopHub</h1>
        </Link>

        <Link
          href="/account"
          className="text-sm hover:text-amazon-orange flex items-center"
        >
          <MapPin size={18} className="mr-1" />
          <div>
            <div className="text-xs">Delivering to Perambalur 621212</div>
            <div className="font-bold">Update Loaction</div>
          </div>
        </Link>
      </div>

      <div>
        {/* Search Bar - Hide on mobile */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative flex min-w-[600px]">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-r-none border-r-0 focus-visible:ring-amazon-yellow focus-visible:border-amazon-yellow"
            />
            <Button
              type="submit"
              className="rounded-l-none bg-amazon-yellow hover:bg-amazon-orange text-amazon-darkBlue"
            >
              <Search size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/account"
            className="text-sm hover:text-amazon-orange flex items-center"
          >
            <User size={18} className="mr-1" />
            <div>
              <div className="text-xs">Hello, Sign in</div>
              <div className="font-bold">Account</div>
            </div>
          </Link>

          <Link href="/orders" className="text-sm hover:text-amazon-orange">
            <div className="text-xs">Returns</div>
            <div className="font-bold">& Orders</div>
          </Link>

          <Link
            href="/cart"
            className="flex items-center hover:text-amazon-orange"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </div>
            <span className="ml-1 font-bold">Cart</span>
          </Link>
        </nav>
      </div>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={24} />
      </Button>

      {/* Mobile Search Bar */}
      {/* <div className="p-2 md:hidden">
          <div className="relative flex w-full">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-r-none border-r-0"
            />
            <Button
              type="submit"
              className="rounded-l-none bg-amazon-yellow hover:bg-amazon-orange text-amazon-darkBlue"
            >
              <Search size={20} />
            </Button>
          </div>
        </div> */}

      {/* Mobile menu dropdown */}
      {/* {isMenuOpen && (
          <div className="md:hidden bg-amazon-darkBlue border-t border-gray-700 p-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/account"
                className="text-sm hover:text-amazon-orange py-2"
              >
                Account
              </Link>
              <Link
                href="/orders"
                className="text-sm hover:text-amazon-orange py-2"
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className="text-sm hover:text-amazon-orange py-2 flex items-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Cart (0)
              </Link>
            </nav>
          </div>
        )} */}
    </div>
  );
};

export default NavBar;
