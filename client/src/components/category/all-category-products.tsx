import { Product } from "@/types/product-types";
import React from "react";
import ProductCard from "../products/product-card";

const AllCategoryProducts = ({ products }: { products?: Product[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      )) || <p>No products found</p>}
    </div>
  );
};

export default AllCategoryProducts;
