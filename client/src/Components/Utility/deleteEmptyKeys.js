export function deleteEmptyKeys(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    } else if (obj[propName].toString().trim() === "") {
      delete obj[propName];
    }
  }
  return obj;
}
