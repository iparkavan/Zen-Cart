import AllCategoryProducts from "@/components/category/all-category-products";
import axiosServer from "@/lib/axios-server";
import { ProductsApiResponseType } from "@/types/product-types";
import React from "react";

const page = async () => {
  const axios = await axiosServer();

  const res = await axios.get<ProductsApiResponseType>(`/products/all`);

  const products = res.data.products;

  return (
    <div>
      <div className="p-6">
        <AllCategoryProducts products={products} />
      </div>
    </div>
  );
};

export default page;
