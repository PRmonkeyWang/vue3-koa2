import https from '@/utils/https'
import qs from 'qs'

// loginLogList
export const loginRequest = (data: any) => {
  return https({url: ''}).post('login', data)
}

export const listByStatus = (data: any) => {
  return https().get('doctor/listByStatus?' + qs.stringify(data))
}

export const catchClinic = (data: any) => {
  return https().put('doctor/catchClinic', data)
}

export const getRemoteById = (data: any) => {
  return https().get('doctor/getRemoteById?' + qs.stringify(data))
}

export const updateRemoteClinic = (data: any) => {
  return https().put('doctor/updateRemoteClinic', data)
}

export const getDoctorAccount = (data: any) => {
  return https().get('doctor/getDoctorAccount', data)
}

export const listAccountDetail = (data: any) => {
  return https().get('doctor/listAccountDetail', data)
}

export const getOrderStatus = (data: any) => {
  return https().get('doctor/getOrderStatus', data)
}

export const updateOrderStatus = (data: any) => {
  return https().put('doctor/updateOrderStatus', data)
}

export const applyForMeeting = (data: any) => {
  return https().put('doctor/applyForMeeting', data)
}

export const getOutPatientById = (data: any) => {
  return https().get('doctor/getOutPatientById?' + qs.stringify(data))
}

export const getDictData = (data: any) => {
  return https({ hasLoading: false }).get('doctor/getDictData', data)
}

