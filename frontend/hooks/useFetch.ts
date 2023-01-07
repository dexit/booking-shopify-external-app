import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import { useQueryClient } from "react-query";

let shop = "testeriphone.myshopify.com";
if (import.meta.env.PROD) {
  shop = "bysistersdk.myshopify.com";
}

export const useFetch = () => {
  const queryClient = useQueryClient();

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const put = useCallback(async (url: string, body?: any) => {
    const response = await axios.put(`/api/${url}?shop=${shop}`, body);
    return response.data;
  }, []);

  const destroy = useCallback(async (url: string) => {
    const response = await axios.delete(`/api/${url}?shop=${shop}`);
    return response.data;
  }, []);

  const post = useCallback(async <T>(url: string, body?: any) => {
    try {
      const response = await axios.post<any, AxiosResponse<T>>(
        `/api/${url}?shop=${shop}`,
        body
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }, []);

  const get = useCallback(async (url: string) => {
    const response = await axios.get(`/api/${url}?shop=${shop}`);
    return response.data;
  }, []);

  return {
    fetch,
    put,
    post,
    destroy,
    get,
    mutate: (key: any) => queryClient.invalidateQueries(key),
  };
};
