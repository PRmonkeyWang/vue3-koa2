import { useStore } from '@/store'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import Config from '@/config'
import { ElMessage } from 'element-plus';
import { throttle } from 'lodash';
import { getToken } from '@/utils/cookies';
import { Toast } from 'vant';
const netConfig = Config.netConfig

const triggleLoading = (loading: boolean) => {
  useStore().commit('app/SET_LOADING', loading)
}

const loginOut = throttle(() => {
  Toast('登录过期')
  useStore().dispatch('user/loginOut')
}, 2000)

const https = ({ hasToken = true, hasLoading = true, url = '/api' } = {}) => {
  const service: AxiosInstance = axios.create({
    ...netConfig,
    baseURL: netConfig.baseURL + url
  })

  const err = (error: AxiosError) => {
    if (hasLoading) {
      triggleLoading(false);
    }
    Toast('网络错误')
    return Promise.reject(error);
  };

  service.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (hasToken) {
        config.headers.Authorization = 'Bearer ' + getToken() || ''
      }
      if (hasLoading) {
        triggleLoading(true);
      }

      return config;
    }
    , err
  )

  service.interceptors.response.use(
    (config: AxiosResponse) => {
      if (hasLoading) {
        triggleLoading(false);
      }
      if (config.data.code !== 0 && config.data.code !== 200) {
        if (([401].includes(config.data.code))) {
          loginOut()
        } else {
          if (config.data?.msg) Toast(config.data.msg)
        }
        return;
      }
      return config.data;
    }
    , err
  )

  return service
}

export default https
