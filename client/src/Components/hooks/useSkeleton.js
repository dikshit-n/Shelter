export const useSkeleton = () => {
  return (query, condition) => {
    document.querySelectorAll(query).forEach((el) => {
      let inner;
      if (el) inner = el.innerHTML;
      console.log(inner);
      if (condition) {
        el?.classList.add("skeleton-box");
        // if (el) el.innerHTML = "";
      } else {
        if (el) {
          // el.innerHTML = inner;
          if (el.classList.contains("skeleton-box"))
            el.classList.remove("skeleton-box");
        }
      }
    });
  };
};
