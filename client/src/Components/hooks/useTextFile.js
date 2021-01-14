export function useTextFile() {
  //   var fileName = "";
  //   var text = "";
  var element = document.createElement("a");
  let insert = (fileName, text) => {
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", fileName);

    element.style.display = "none";
    document.body.appendChild(element);
  };

  let download = () => {
    element.click();

    document.body.removeChild(element);
  };

  return [insert, download];
}
