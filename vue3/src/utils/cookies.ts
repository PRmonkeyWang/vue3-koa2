import storage, { StorageType } from '@/utils/storage'
class Keys {
  static languageKey = 'languageKey'
  static tokenKey = 'token'
  static cityArea = 'cityArea'
}

// /StorageType 有local cookie session 三种类型

export const getLanguage = () => storage.rcGetItem(StorageType.local, Keys.languageKey) || 'zh-cn'
export const setLanguage = (data: any) => storage.rcSetItem(StorageType.local, Keys.languageKey, data)

export const getToken = () => storage.rcGetItem(StorageType.session, Keys.tokenKey)
export const setToken = (data: any) => storage.rcSetItem(StorageType.session, Keys.tokenKey, data)
export const removeToken = () => storage.rcRemoveItem(StorageType.session, Keys.tokenKey)

export const getCityArea = () => storage.rcGetItem(StorageType.session, Keys.cityArea)
export const setCityArea = (data: any) => storage.rcSetItem(StorageType.session, Keys.cityArea, data)
export const removeCityArea = () => storage.rcRemoveItem(StorageType.session, Keys.cityArea)
