export function hideTel (tel) {
  return tel.substring(0, 3) + '****' + tel.substring(7, 11)
}
