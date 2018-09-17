const Api = {
  Test: 'xl-mini_client'
}

/**
 * 
 * @param {*} url - 请求路径
 * @param {*} header - 附加头部
 * @param {*} data - 请求json数据
 */
export function fetchJSON(url, header, data) {
  let url = `${Api}/${url}`
  headers = Object.assign({'Content-Type': 'application/json'})
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
}