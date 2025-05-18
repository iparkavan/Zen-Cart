import { getAllCategories } from "@/apis/category-api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};
