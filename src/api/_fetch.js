import axios from 'axios'
export const Api = {
  Test: 'http://192.168.63.144'
}
export const Ip = {
  Test: '192.168.63.144'
}

const XL_Api = {
  Test: 'http://192.168.63.144'
}
/**
 * 
 * @param {url} string  - 请求路径
 * @param {header} Object  - 附加头部
 * @param {data} Object - 请求json数据
 */
export function fetchJSON(url, header = {}, data = {}) {
  let _url = `${Api.Test}${url}`
  let headers = Object.assign({}, header, {'Content-Type': 'application/json'})
  return axios.post(_url,
    data,
    headers
  )
}

/**
 * 
 * @param {*} url 
 * @param {*} header 
 * @param {*} data 
 */
export function fetchXL(url, header = {}, data = {}) {
  let _url = `${XL_Api.Test}${url}`
  let headers = Object.assign({}, header, {'Content-Type': 'application/json'})
  return axios.post(_url, data,
    headers
  ).catch((e) => {
  })
}