import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { useRouter } from "next/router";
import { context } from "../store";
import { getLocalStorage, setToLocalStorage } from "../store/local_storage";
import { ResponseAPI } from "./types";

interface CancelPerToken {
  url: string | undefined;
  cancelToken: CancelTokenSource;
}
let cancelTokenPerUrls: Array<CancelPerToken> = []

const cancelTokenConfiguration = (config: AxiosRequestConfig) => {
  if (!cancelTokenPerUrls.map(cancelTokenPerUrl => cancelTokenPerUrl.url).includes(config.url)) {
    cancelTokenPerUrls.push({
      url: config.url,
      cancelToken: axios.CancelToken.source()
    })
  }
  const selectedUrl = cancelTokenPerUrls.find(cancelTokenPerUrl => cancelTokenPerUrl.url === config.url)
  const indexSelectedUrl = cancelTokenPerUrls.findIndex(cancelTokenPerUrl => cancelTokenPerUrl.url === config.url)
  if (selectedUrl) {
    selectedUrl.cancelToken.cancel("Operation canceled due to new request.")
  }

  if (indexSelectedUrl > -1) {
    cancelTokenPerUrls[indexSelectedUrl].cancelToken = axios.CancelToken.source()
    config.cancelToken = cancelTokenPerUrls[indexSelectedUrl].cancelToken.token
  }
}

const EXAMPLE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string

// without auth guard
export const instance = axios.create({
  baseURL: EXAMPLE_BACKEND_URL
})

const useGuardInstance = () => {
  const ctx = context()
  const router = useRouter()
  
  return (withoutErrorModal?: boolean) => {
    const newInstance = axios.create({
      baseURL: EXAMPLE_BACKEND_URL
    })
    newInstance.interceptors.request.use((config) => {
      cancelTokenConfiguration(config)
      config.headers = {
        Authorization: getLocalStorage().accessToken || false
      }
      return config
    })
    newInstance.interceptors.response.use<AxiosResponse>(undefined, (err: AxiosError) => {
      if (err.code !== "ERR_CANCELED") {
        if (err.response?.status === 401) {
          setToLocalStorage({
            admin: undefined,
            accessToken: undefined
          })
          if (router.pathname !== "/login") router.push("/login")
          ctx.dispatch({
            isModal: {
              title: "Warning!",
              desc: "Please login again"
            }
          })
        }
        else {
          if (!withoutErrorModal) ctx.dispatch({
            isModal: {
              title: "Warning!",
              desc: "Oops! Something went wrong .."
            }
          })
        }
      }
      return Promise.reject(err);
    })
    return newInstance
  }
}

export default useGuardInstance