import "./TabFilter.css";

import React from "react";
import { shopStream } from "../../Epics/Shop";
const tabsName = ["Recent", "Featured", "Top Rated", "Sale"];
const TabFilter = ({ tabIndex, setTabIndex }) => {
  return (
    <div className="tab-name-list">
      {tabsName.map((tabName, key) => (
        <span
          key={key}
          className={`tab-name-item${tabIndex === key ? " active" : ""}`}
          onClick={() => {
            setTabIndex(key);
            shopStream.updateData({tabIndex: tabName})
          }}
        >
          {tabName}
        </span>
      ))}
    </div>
  );
};

export default TabFilter;
