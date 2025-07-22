import axiosInstance from "@/lib/axios-client";

export const getAllProducts = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await axiosInstance.get(
    `/products/all?page=${page}&limit=${limit}`
  );
  return res.data;
};
