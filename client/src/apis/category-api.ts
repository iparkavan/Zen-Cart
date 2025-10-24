import axiosInstance from "@/lib/axios-client";
import { CategoriesResponseType } from "@/types/category-types";
import { useQuery } from "@tanstack/react-query";

export const getAllCategories = async (): Promise<CategoriesResponseType> => {
  const res = await axiosInstance.get(`/categories/all`);
  return res.data;
};

export const getCategoryByIdQueryFn = async (categoryId: string) => {
  const res = await axiosInstance.get(`/filter/${categoryId}`);
  return res.data;
};
