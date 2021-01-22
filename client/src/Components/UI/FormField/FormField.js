import React, { Fragment } from "react";
import { Label } from "reactstrap";
import uniqueid from "uniqid";
import DateInput from "../Date/Date";
import "./FormField.css";
// import Select from "../Select/Select";

const EachField = (props) => {
  let id = uniqueid();
  const getFormField = () => {
    switch (props.type) {
      case "text":
        return (
          <div
            className={props.containerClassNameWithLabel}
            style={{ ...props.containerStyleWithLabel }}
          >
            {props.displayName ? (
              <Label className="form-label" for={id}>
                {props.displayName}
              </Label>
            ) : null}

            <div
              className={"input-field " + props.containerClassName}
              style={{ ...props.containerStyle }}
            >
              {props.addon ? props.addon : <i className="width_0"></i>}
              <input
                disabled={props.disabled}
                type={props.type}
                id={id}
                name={props.name}
                value={props.value}
                onChange={(event) => {
                  props.onChange(event);
                }}
                placeholder={props.placeholder}
                required={props.required}
                readOnly={props.readOnly}
                {...props}
              />
            </div>
          </div>
        );
      case "textarea":
        return (
          <div
            className={props.containerClassNameWithLabel}
            style={{ ...props.containerStyleWithLabel }}
          >
            {props.displayName ? (
              <Label className="form-label" for={id}>
                {props.displayName}
              </Label>
            ) : null}

            <div
              className={"input-field-textarea " + props.containerClassName}
              style={{ ...props.containerStyle }}
            >
              {props.addon ? props.addon : <i className="width_0"></i>}
              <textarea
                disabled={props.disabled}
                type={props.type}
                id={id}
                value={props.value}
                onChange={(event) => {
                  props.onChange(event);
                }}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                readOnly={props.readOnly}
                {...props}
              />
            </div>
          </div>
        );
      case "select":
        return (
          <div
            className={props.containerClassNameWithLabel}
            style={{ ...props.containerStyleWithLabel }}
          >
            {props.displayName ? (
              <Label className="form-label" for={id}>
                {props.displayName}
              </Label>
            ) : null}
            <div
              className={"input-field-select " + props.containerClassName}
              style={{ ...props.containerStyle }}
            >
              {props.addon ? props.addon : <i className="width_0"></i>}
              <select
                {...props}
                defaultValue={props.placeholder}
                value={
                  (props.value === "" ||
                    props.value === null ||
                    props.value === undefined) &&
                  (props.defaultValue === "" ||
                    props.defaultValue === null ||
                    props.defaultValue === undefined)
                    ? undefined
                    : props.value
                }
              >
                {props.placeholder ? (
                  <option value={props.placeholder} disabled>
                    {props.placeholder}
                  </option>
                ) : null}
                {props.options?.map((el, index) => {
                  let elArray = el ? el.split("__") : null;
                  let value = elArray
                    ? elArray[1]
                      ? elArray[1]
                      : elArray[0]
                    : "";
                  let label;
                  if (elArray) {
                    props.options.map((el) => {
                      let eArray = el ? el.split("__") : null;
                      let val = eArray
                        ? eArray[1]
                          ? eArray[1]
                          : eArray[0]
                        : "";
                      let lab = eArray ? eArray[0] : "";
                      if (val === value) {
                        label = lab;
                      }
                    });
                  } else {
                    label = elArray ? elArray[0] : "";
                  }
                  return (
                    <option key={index} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        );
      case "number":
        return (
          <div
            className={props.containerClassNameWithLabel}
            style={{ ...props.containerStyleWithLabel }}
          >
            {props.displayName ? (
              <Label className="form-label" for={id}>
                {props.displayName}
              </Label>
            ) : null}

            <div
              className={"input-field " + props.containerClassName}
              style={{ ...props.containerStyle }}
            >
              {props.addon ? props.addon : <i className="width_0"></i>}
              <input
                disabled={props.disabled}
                type={props.type}
                id={id}
                value={props.value}
                onChange={(event) => {
                  props.onChange(event);
                }}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                readOnly={props.readOnly}
                {...props}
              />
            </div>
          </div>
        );

      case "date":
        return (
          <div
            className={props.containerClassNameWithLabel}
            style={{ ...props.containerStyleWithLabel }}
          >
            {props.displayName ? (
              <Label className="form-label" for={id}>
                {props.displayName}
              </Label>
            ) : null}

            <DateInput
              disabled={props.disabled}
              type={props.type}
              id={id}
              value={props.value}
              onChange={(event) => {
                props.onChange(event);
              }}
              name={props.name}
              placeholder={props.placeholder}
              required={props.required}
              readOnly={props.readOnly}
              {...props}
            />
          </div>
        );
      default:
        return (
          <div
            className={props.containerClassNameWithLabel}
            style={{ ...props.containerStyleWithLabel }}
          >
            {props.displayName ? (
              <Label className="form-label" for={id}>
                {props.displayName}
              </Label>
            ) : null}

            <div
              className={"input-field " + props.containerClassName}
              style={{ ...props.containerStyle }}
            >
              {props.addon ? props.addon : <i className="width_0"></i>}
              <input
                disabled={props.disabled}
                type={props.type}
                id={id}
                name={props.name}
                value={props.value}
                onChange={(event) => {
                  props.onChange(event);
                }}
                placeholder={props.placeholder}
                required={props.required}
                readOnly={props.readOnly}
                {...props}
              />
            </div>
          </div>
        );
    }
  };
  return getFormField();
};

export default EachField;

// const changeHandler = (event) => {
//   const { name, value } = event.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

// const selectChangeHandler = (value, name) => {
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

// var schema = [
//   {
//     name: "name",
//     displayName: "Name",
//     placeholder: "Enter Name",
//     type: "text",
//     value: formData.name,
//     onChange: changeHandler,
//     required: true,
//   },
//   {
//     name: "address",
//     displayName: "Address",
//     placeholder: "Enter Address",
//     type: "textarea",
//     value: formData.address,
//     onChange: changeHandler,
//     required: true,
//   },
//   {
//     name: "country",
//     displayName: "Country",
//     placeholder: "Enter Country",
//     type: "select",
//     value: formData.country,
//     onChange: selectChangeHandler,
//     options: ["India", "Japan"],
//     required: true,
//   },
//   {
//     name: "email",
//     displayName: "Email",
//     placeholder: "Enter Email",
//     type: "email",
//     value: formData.email,
//     onChange: changeHandler,
//     required: true,
//   },
//   {
//     name: "contactPerson",
//     displayName: "Contact Person",
//     placeholder: "Enter Contact Person",
//     type: "text",
//     value: formData.contactPerson,
//     onChange: changeHandler,
//     required: true,
//   },
//   {
//     name: "contactNumber",
//     displayName: "Contact Number",
//     placeholder: "Enter Contact Number",
//     type: "number",
//     value: formData.contactNumber,
//     onChange: changeHandler,
//     required: true,
//   },
//   {
//     name: "latitude",
//     type: "number",
//     displayName: "Latitude",
//     placeholder: "Enter Latitude",
//     value: formData.latitude,
//     onChange: changeHandler,
//     required: true,
//   },
//   {
//     name: "longitude",
//     type: "number",
//     displayName: "Longitude",
//     placeholder: "Enter Longitude",
//     value: formData.longitude,
//     onChange: changeHandler,
//     required: true,
//   },
// ];
