import { getAllProducts } from "@/apis/product-api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllProducts({ page, limit }),
  });
};
