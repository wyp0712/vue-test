import axios from 'axios'

let base = ''

export const getUserListPage = params => {
  return axios.get(`${base}/user/listpage`, params).then(res => res.data)
}
