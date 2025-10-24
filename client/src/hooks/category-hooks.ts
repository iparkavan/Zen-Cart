import { getAllCategories, getCategoryByIdQueryFn } from "@/apis/category-api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

export const useGetCategoryById = (categoryId: string) => {
  return useQuery({
    queryKey: ["category-id", categoryId],
    queryFn: () => getCategoryByIdQueryFn(categoryId),
  });
};
