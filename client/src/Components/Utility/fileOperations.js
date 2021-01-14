import Papa from "papaparse";
var { jsPDF } = require("jspdf");
const Compress = require("compress.js");
const compress = new Compress();

export function base64ToArrayBuffer(base64) {
  // console.log(base64);
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  console.log(bytes.buffer);
  return bytes.buffer;
}

export const downloadImgAsPdf = (url, options = {}) => {
  console.log(url);
  const doc = new jsPDF();
  let defaultOptions = {
    format: "JPEG",
    x: 15,
    y: 40,
    width: 180,
    height: 180,
    alias: null,
    compression: "NONE",
    rotaion: 0,
    ...options,
  };
  doc.addImage(url, ...Object.values(defaultOptions));
  doc.output("datauri");
  doc.save((options.name || "file") + ".pdf");
};

export function extractCsvData(file, callBack) {
  if (file) {
    Papa.parse(file, {
      complete: (res) => {
        callBack(res.data);
      },
    });
  } else {
    callBack(null);
  }
}

export const compressFile = async (files, options = {}, callBack) => {
  compress
    .compress(files, {
      size: options.size ? options.size : 2, // the max size in MB, defaults to 2MB
      quality: options.quality ? options.quality : 0.75, // the quality of the image, max is 1,
      maxWidth: 1920, // the max width of the output image, defaults to 1920px
      maxHeight: 1920, // the max height of the output image, defaults to 1920px
      resize: options.resize !== undefined ? options.resize : false, // defaults to true, set false if you do not want to resize the image width and height
    })
    .then((data) => {
      let newData = data.map((el) => ({
        ...el,
        dataWithPrefix: el.prefix + el.data,
      }));
      //   data[0].prefix + data[0].data
      callBack(newData);
      //   return [...data];
    });
};

export const processImage = (file, callback) => {
  if (file) {
    let fd = new FileReader();
    fd.readAsDataURL(file);
    fd.onload = (e) => {
      callback(e.target.result);
      console.log(e.target.result);
    };
  } else {
    callback(null);
  }
};
