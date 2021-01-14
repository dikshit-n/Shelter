export function capitalize(string) {
  console.log(string);
  console.log(string ? string.charAt(0).toUpperCase() + string.slice(1) : "");
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}
