export function numberWithComma(x) {
  if (x !== undefined && x !== null) {
    if (x.toString().length !== 0 && x.toString() !== "NaN") {
      return x
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        .toString();
    } else {
      return "";
    }
  } else return "";
}
