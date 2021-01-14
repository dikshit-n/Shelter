export const missingElements = (arr1, arr2, accessor) => {
  var arr1Length = arr1.length;
  var arr2Length = arr2.length;

  var masterArray = [arr1, arr2];

  var missing = [];

  if (arr1Length === arr2Length) {
    missing = [];
  } else {
    var firstArray =
      masterArray[
        masterArray
          .map((a) => a.length)
          .indexOf(Math.max(...masterArray.map((a) => a.length)))
      ];
    var secondArray =
      masterArray[
        masterArray
          .map((a) => a.length)
          .indexOf(Math.min(...masterArray.map((a) => a.length)))
      ];
    missing = firstArray.map((el) => {
      return secondArray.some((ele) => ele[accessor] === el[accessor])
        ? null
        : el;
    });
  }

  return [...missing].filter((el) => el !== null);
};
