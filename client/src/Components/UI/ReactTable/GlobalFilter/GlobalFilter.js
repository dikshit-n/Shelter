import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { FormGroup, Input } from "reactstrap";
import "./GlobalFilter.css";

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  // const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <FormGroup>
      <Input
        className="react-table-input"
        type="text"
        value={value || ""}
        placeholder="Search"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </FormGroup>
  );
};

export default GlobalFilter;
