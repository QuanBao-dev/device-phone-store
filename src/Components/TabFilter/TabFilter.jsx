import "./TabFilter.css";

import React from "react";
const tabsName = ["Recent", "Featured", "Top Rated", "Sale"];
const TabFilter = ({tabIndex, setTabIndex}) => {
  return (
    <div className="tab-name-list">
      {tabsName.map((tabName, key) => (
        <span
          key={key}
          className={`tab-name-item${tabIndex === key ? " active" : ""}`}
          onClick={() => {
            console.log(key);
            setTabIndex(key);
          }}
        >
          {tabName}
        </span>
      ))}
    </div>
  );
};

export default TabFilter;
