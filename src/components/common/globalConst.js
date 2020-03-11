
const global = {}
global.token = null
global.phone = null
global.setPhone = (param) => {
  global.phone = param
}
global.setToken = (param) => {
  global.token = param
}
export default global
