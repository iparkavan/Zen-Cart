// lib/axios-server.ts
import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return instance;
};

export default axiosServer;
