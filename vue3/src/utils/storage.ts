import VAES from './ase'
import Cookies from 'js-cookie'

export enum StorageType {
  local,
  session,
  cookie
}

interface VStorageInterface {
  rcSetItem<T>(type: StorageType, key: string, value: T): void
  rcGetItem(type: StorageType, key: string): string | null
  rcRemoveItem(type: StorageType, key: string): void
}

class VStorage implements VStorageInterface {
  private static instance: VStorage
  static shared() {
    if (!this.instance) {
      this.instance = new VStorage()
    }
    return this.instance
  }

  /**
   * @description: 本地保存数据AES加密处理
   * @param {StorageType} type localStorage 和 sessionStorage 选择
   * @param {string} key
   * @param {T} value
   * @return {*}
   */
  rcSetItem<T>(type: StorageType = StorageType.local, key: string, value: T) {
    const valueJson = JSON.stringify(value)
    const valueAes = VAES.encrypt(valueJson) as string
    if (type === StorageType.local) {
      localStorage.setItem(key, valueAes)
    } else if (type === StorageType.session) {
      sessionStorage.setItem(key, valueAes)
    } else {
      Cookies.set(key, valueAes)
    }
  }

  rcGetItem(type: StorageType = StorageType.local, key: string): any {
    let data: any;
    if (type === StorageType.local) {
      data = VAES.decrypt(localStorage.getItem(key))
    } else if (type === StorageType.session) {
      data = VAES.decrypt(sessionStorage.getItem(key))
    } else {
      data = VAES.decrypt(Cookies.get(key) ?? '')
    }

    try {
      data = JSON.parse(data)
    } catch {
      // console.error('data is not a json object');
    }
    return data
  }

  rcRemoveItem(type: StorageType = StorageType.local, key: string) {
    if (type === StorageType.local) {
      localStorage.removeItem(key)
    } else if (type === StorageType.session) {
      sessionStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  }
}

export default VStorage.shared()
