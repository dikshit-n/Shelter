import { CSSTransition, TransitionGroup } from "react-transition-group";
import EmptyMessage from "../EmptyMessage/EmptyMessage";
import "./AnimatedList.css";

const AnimatedList = ({
  timeout = 300,
  classNames,
  emptyMessage,
  children,
  loading,
  error,
}) => {
  children = Array.isArray(children) ? children : [children];
  let childrenLength = children ? children.length : 0;
  return childrenLength === 0 && !loading ? (
    <EmptyMessage message={emptyMessage || "Empty"} />
  ) : error ? (
    <EmptyMessage message={error || "Ssomething went wrong"} />
  ) : (
    <TransitionGroup component="ul" className="animated-list">
      {children?.map((el, index) => (
        <CSSTransition
          timeout={timeout}
          key={index}
          classNames={classNames || "fade"}
        >
          {el}
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default AnimatedList;
