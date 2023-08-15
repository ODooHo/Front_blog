import axios, { AxiosError } from "axios";
import { getAccessTokenApi } from "./authApis";

export async function sendRequest<T>(
    method: "get" | "post" | "patch",
    url: string,
    token: string | null,
    refreshToken: string | null,
    data?: any
  ): Promise<T | null> {
    try {
      const response = await axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = response.data;
      return result;
    } catch (error) {
      const axiosError = error as AxiosError;
  
      if (axiosError.response && axiosError.response.status === 403 && refreshToken) {
        try {
          const token = await getAccessTokenApi(refreshToken);
  
          // 재발급된 토큰으로 요청 다시 보내기
          return await sendRequest<T>(method, url, token, refreshToken, data);
        } catch (refreshError) {
          console.error("Error refreshing access token:", refreshError);
          return null;
        }
      }
  
      console.error("Error sending request:", axiosError);
      return null;
    }
  }