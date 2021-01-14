export function filterNumbers(string) {
  if (string !== null && string !== undefined) {
    return string.toString().replace(/\D/g, "") !== ""
      ? parseInt(string.toString().replace(/\D/g, ""))
      : "";
  }
  return "";
}
