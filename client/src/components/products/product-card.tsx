"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product-types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const discount = product.originalPrice
  //   ? Math.round((1 - product.price / product.originalPrice) * 100)
  //   : 0;

  return (
    <Card className="overflow-hidden h-full flex flex-col p-0 transition-shadow hover:shadow-md">
      <div className="relative">
        {/* {product.badge && (
          <div className="absolute top-2 left-2 bg-amazon-orange text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </div>
        )}

        {product.originalPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )} */}

        <Link href={`/products/${product._id}`}>
          <div className="h-[200px] overflow-hidden bg-gray-50">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-transform hover:scale-105"
            />
          </div>
        </Link>
      </div>

      <CardContent className="flex-grow">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-medium line-clamp-2 mb-2 hover:text-amazon-blue">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex text-amazon-yellow">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < product.rating ? "fill-amazon-yellow" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">
            ({product.reviews.length})
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">${product.offerPrice}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {product.originalPrice && (
          <div className="text-xs text-green-600 mt-1">
            You save: ${product.originalPrice - product.offerPrice}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <Button className="w-full bg-primary hover:bg-amazon-orange">
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
