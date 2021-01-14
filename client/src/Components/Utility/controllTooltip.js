export const controlToolTip = () => {
  const dataFors = document.querySelectorAll("[data-for]");
  dataFors.forEach((el) => {
    if (!(el.clientWidth < el.scrollWidth) && el !== null) {
      const toolTip = document.getElementById(el.getAttribute("data-for"));
      if (toolTip !== null) toolTip.style.display = "none";
    }
  });
};
