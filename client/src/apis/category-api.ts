import axiosInstance from "@/lib/axios-client";
import { CategoriesResponseType } from "@/types/category-types";
import { useQuery } from "@tanstack/react-query";

export const getAllCategories = async (): Promise<CategoriesResponseType> => {
  const res = await axiosInstance.get(`/category/all`);
  return res.data;
};
