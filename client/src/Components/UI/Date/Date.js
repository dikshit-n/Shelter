import React, { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import "./Date.css";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateInput = (props) => {
  const [startDate, setStartDate] = useState(props.value);

  return (
    <Fragment>
      <br />
      <DatePicker
        {...props}
        placeholderText={props.placeholder}
        className="date"
        dateFormat="dd-MM-yyyy"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          props.onChange({
            target: {
              value: date,
              name: props.name,
            },
          });
        }}
        // calendarClassName="rasta-stripes"
      />
    </Fragment>
  );
};

export default DateInput;
