import React from "react";
import Select from "react-select";

const SelectInput = (props) => {
  let classNames = [
    props.className ? props.className : "",
    "react-select primary",
  ];
  return (
    <Select
      isDisabled={props.disabled}
      styles={{
        control: (styles) => ({
          ...styles,
          ...props.style,
          color: "white",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          // const color = chroma(data.color);
          return {
            ...styles,
            border: props.optionsBorder ? props.optionsBorder : "none",
            backgroundColor: isFocused
              ? props.optionsActiveBackgroundColor
                ? props.optionsActiveBackgroundColor
                : "rgba(0, 0, 0, 0.764)"
              : isDisabled
              ? props.disabledOptionsBackgroundColor
                ? props.disabledOptionsBackgroundColor
                : "grey"
              : props.optionsBackgroundColor
              ? props.optionsBackgroundColor
              : "white",
            color: isFocused
              ? props.optionsActiveTextColor
                ? props.optionsActiveTextColor
                : "white"
              : isDisabled
              ? props.disabledOptionsTextColor
                ? props.disabledOptionsTextColor
                : "black"
              : props.optionsTextColor
              ? props.optionsTextColor
              : "black",
            cursor: isDisabled ? "not-allowed" : "default",
          };
        },
      }}
      // theme={(theme) => ({
      //   ...theme.colors,
      //   text: "orangered",
      //   // text: props.textColor ? props.textColor : "black",
      // })}

      className={classNames.join(" ")}
      classNamePrefix="react-select"
      placeholder={props.placeholder}
      value={
        props.value !== undefined && props.value !== null
          ? props.value.length === 0
            ? null
            : { value: props.value, label: props.value }
          : null
      }
      onChange={(value) =>
        props.onChange(
          value !== null && value !== undefined
            ? value.length !== 0
              ? value.label
              : null
            : null,
          props.name ? props.name : null
        )
      }
      name={props.name}
      options={
        props.options === null
          ? []
          : [...props.options.map((el) => ({ value: el, label: el }))]
      }
    />
  );
};

export default SelectInput;
