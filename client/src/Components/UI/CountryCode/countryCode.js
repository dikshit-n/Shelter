import "./countryCode.css";
var countries = require("country-data");
const CountryCode = (props) => {
  return (
    <div className="country-code">
      <select
        onChange={props.onChange}
        value={props.value}
        defaultValue={props.defaultValue || "+91"}
        {...props}
      >
        {countries.callingCodes.all.map((el, index) => (
          <option key={index} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryCode;
