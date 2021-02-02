import "./MenuButton.css";

const threeDots = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
    ></path>
  </svg>
);

const MenuButton = (props) => {
  return (
    <button {...props} className={"my-menu-button " + props.className}>
      {props.children || <div className="flex-center">{threeDots}</div>}
    </button>
  );
};

export default MenuButton;
