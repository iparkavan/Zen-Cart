import AllCategoryProducts from "@/components/category/all-category-products";
import axiosServer from "@/lib/axios-server";
import { ProductsApiResponseType } from "@/types/product-types";
import React from "react";

interface CategoryPageProps {
  searchParams: { ref?: string };
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) => {
  const axios = await axiosServer();

  const params = await searchParams;

  const categoryRef = params?.ref || "all";

  const res = await axios.get<ProductsApiResponseType>(`/categories`, {
    params: { category: categoryRef },
  });

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
