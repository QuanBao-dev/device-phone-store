import "./AdditionalInformation.css";

import React from "react";

const AdditionalInformation = ({
  additionalInformation,
  containerAdditionalInformationRef,
}) => {
  return (
    <table
      className="additional-information-container"
      ref={containerAdditionalInformationRef}
    >
      <tbody>
        {Object.keys(additionalInformation).map((key, index) => (
          <tr
            key={index}
            className="table-item-container"
            style={{
              borderBottom:
                index === Object.keys(additionalInformation).length - 1
                  ? null
                  : "1px solid rgb(209, 209, 209)",
            }}
          >
            <td className="label-name">{key}: </td>
            <td className="value-item">{additionalInformation[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdditionalInformation;
