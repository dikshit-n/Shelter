export const loop = (n, callback) => {
  //   console.log(n);
  let result = [];
  for (let i = 0; i < n; i++) {
    // console.log(i);
    result.push(callback(i));
  }
  return result;
};
