import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const res = await axios.get("/auth/refresh", {
        withCredentials: true
      });
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: res.data.accessToken,
          user: res.data.user
        };
      });
      return res.data.accessToken;
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
