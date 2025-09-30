import { getCurrentUserQueryFn } from "@/apis/auth-api";
import { useQuery } from "@tanstack/react-query";
// import Cookies from "js-cookie";

const useCurrentUserInfo = () => {
  // const hasAuthCookie = () => {
  //   return !!Cookies.get("token"); // replace with your cookie name
  // };

  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
    retry: 2,
    // enabled: hasAuthCookie(),
  });
  return query;
};

export default useCurrentUserInfo;
