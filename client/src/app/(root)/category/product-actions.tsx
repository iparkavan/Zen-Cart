"use server";

import axiosServer from "@/lib/axios-server";

export const fetchPageProducts = async (page: number) => {
  //   const response = await fetch(
  //     `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  //   );
  const axios = await axiosServer();
  const response = await axios.get(`/products/all?page=${page}&limit=${10}`);
  const data = await response.data;
  return data;
};
