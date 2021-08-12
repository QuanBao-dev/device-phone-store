import "./Input.css";

import React, { useState } from "react";

const options = [
  "Åland Islands",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belau",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Saint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Korea",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestinian Territory",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "São Tomé and Príncipe",
  "Saint Barthélemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (Dutch part)",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia/Sandwich Islands",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom (UK)",
  "United States (US)",
  "United States (US) Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (British)",
  "Virgin Islands (US)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
let timeout;
const Input = ({
  label,
  isRequired,
  type,
  placeholder,
  inputRef,
  checkBoxRef,
  typeInput = "text",
  errorMessage,
  isDisable
}) => {
  const id =
    label.toLocaleLowerCase && label
      ? label.toLocaleLowerCase().replace(/ /g, "-")
      : null;
  const [isChecked, setIsChecked] = useState(false);
  const [isRequiredState, setIsRequiredState] = useState(isRequired);
  return (
    <div>
      {type !== "checkbox" && (
        <label className="checkout-label-input" htmlFor={id}>
          {label}{" "}
          {isRequired ? (
            <span className="star-require">{"*"}</span>
          ) : (
            "(optional)"
          )}
        </label>
      )}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div style={{ width: "100%" }}>
        {type === "input" && (
          <input
            className="checkout-input"
            type={typeInput}
            id={id}
            required={isRequired}
            placeholder={placeholder}
            ref={inputRef}
            disabled={isDisable}
          />
        )}
        {type === "textarea" && (
          <textarea
            id={id}
            ref={inputRef}
            placeholder="Notes about your order, e.g. special notes for delivery."
            className="checkout-textarea"
          />
        )}
        {type === "select" && (
          <select id={id} className="checkout-select" ref={inputRef}>
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {type === "checkbox" && (
          <div
            className="checkbox-container"
            style={{
              maxHeight:
                isChecked && label === "Create an account?" ? 600 : null,
            }}
          >
            {label === "Create an account?" && (
              <input
                type="checkbox"
                ref={checkBoxRef}
                onChange={() => setIsChecked(checkBoxRef.current.checked)}
                disabled={isDisable}
              />
            )}
            {label !== "Create an account?" && (
              <input type="checkbox" ref={inputRef} required={isRequired} />
            )}
            <span
              style={{
                cursor: "default",
                marginLeft: "0.2rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                if(isDisable) return;
                let element = checkBoxRef ? checkBoxRef.current : undefined;
                if (!element) element = inputRef.current;
                if (element) {
                  element.checked = !element.checked;
                  setIsChecked(element.checked);
                  if (label === "Create an account?")
                    if (element.checked === false)
                      timeout = setTimeout(() => {
                        inputRef.current.style.display = "none";
                        inputRef.current.required = false;
                        setIsRequiredState(false);
                      }, 500);
                    else {
                      clearTimeout(timeout);
                      inputRef.current.style.display = "block";
                      inputRef.current.required = true;
                      setIsRequiredState(true);
                    }
                }
              }}
            >
              {label}
            </span>
            {label === "Create an account?" && (
              <div style={{ marginTop: "1rem" }}>
                <Input
                  placeholder={"Password"}
                  isRequired={isRequiredState}
                  label={"Create account Password"}
                  type={"input"}
                  inputRef={inputRef}
                  typeInput={"password"}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
