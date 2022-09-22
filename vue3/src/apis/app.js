import https from '@/utils/https'

// loginLogList
export const addressList = () => {
  return https().post('address/list', {
    ua: '',
    sign: '12',
    args: '123'
  })
}
