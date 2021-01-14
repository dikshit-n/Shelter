import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ClassicSlider.css";
import uniqueId from "uniqid";

const ClassincSlider = ({
  timeout = 300,
  classNames,
  // emptyMessage,
  className,
  children,
  // loading,
  // error,
  activeIndex = 0,
}) => {
  const UniqueId = uniqueId();
  children = Array.isArray(children) ? children : [children];
  // let childrenLength = children ? children.length : 0;
  console.log(activeIndex);
  return (
    <TransitionGroup component="ul" className="animated-slider">
      {children?.map((el, index) => (
        <CSSTransition
          in={activeIndex + UniqueId === index + UniqueId}
          timeout={timeout}
          key={index}
          classNames={classNames || "slide"}
        >
          <div>{el}</div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ClassincSlider;
