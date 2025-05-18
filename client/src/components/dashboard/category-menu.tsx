"use client";

import { useGetAllCategory } from "@/hooks/category-hooks";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoryMenu = () => {
  const { data, isPending } = useGetAllCategory();
  const categories = data?.categories;

  return (
    <div className="h-full flex items-center gap-4 px-6">
      <Link
        href="/category/all"
        className="hover:text-amazon-orange flex items-center gap-1"
      >
        <MenuIcon />
        All
      </Link>
      {categories?.map((category, index) => (
        <Link
          key={category._id}
          href={`/category/${category.slug}`}
          className="hover:text-amazon-orange"
        >
          {category.name}
        </Link>
      ))}
      {/* <Link href="/category/electronics" className="hover:text-amazon-orange">
        Electronics
      </Link>
      <Link href="/category/computers" className="hover:text-amazon-orange">
        Computers
      </Link>
      <Link href="/category/smart-home" className="hover:text-amazon-orange">
        Smart Home
      </Link>
      <Link href="/category/arts-crafts" className="hover:text-amazon-orange">
        Arts & Crafts
      </Link>
      <Link href="/category/automotive" className="hover:text-amazon-orange">
        Automotive
      </Link>
      <Link href="/category/baby" className="hover:text-amazon-orange">
        Baby
      </Link>
      <Link href="/category/beauty" className="hover:text-amazon-orange">
        Beauty & Personal Care
      </Link>
      <Link href="/category/fashion" className="hover:text-amazon-orange">
        Fashion
      </Link> */}
    </div>
  );
};

export default CategoryMenu;
