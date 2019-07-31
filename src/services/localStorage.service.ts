function get (key: any): any {
  let result: any = localStorage.getItem(key)
  try {
    result = JSON.parse(result)
  } catch (e) { console.log(e) }
  return result
}
function set (key: any, value: any): void {
  const toString: any = Object.prototype.toString
  if (toString.call(value) === '[object Array]' || toString.call(value) === '[object Object]') {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(key, value)
}
function remove (key: any): void {
  return localStorage.removeItem(key)
}
function clear (): void {
  return localStorage.clear()
}
export default { get, set, remove, clear }
