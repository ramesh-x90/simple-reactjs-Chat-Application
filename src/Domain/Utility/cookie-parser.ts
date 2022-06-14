export function getCookies<T>(): T | undefined {
  const cookies = document.cookie;
  if (typeof cookies == "undefined" || cookies == "" || cookies == null) {
    return undefined;
  }
  let list = String(cookies).split(";");

  let obj = {} as T;

  list.forEach((value) => {
    let kv = value.split("=");
    let key = kv[0].trim();
    obj[key] = kv[1].trim();
  });

  return obj;
}
