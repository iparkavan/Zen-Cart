import React from "react";
// import ProductCard, { Product } from "../products/product-card";

const FeaturedProducts: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <a
          href="/products"
          className="text-amazon-blue hover:text-amazon-orange font-medium"
        >
          View all →
        </a>
      </div>
      sdf
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
    </div>
  );
};

export default FeaturedProducts;
