import "./SearchMobile.css";

import React, { useRef } from "react";
import { optionSelect } from "../../Epics/Share";
import { searchSubmit } from "../../Epics/User";
import { useHistory } from "react-router";

const SearchMobile = ({ isActive, setIsActive }) => {
  const inputRef = useRef();
  const selectRef = useRef();
  const history = useHistory();
  return (
    <div className={`search-mobile-container${isActive ? " active" : ""}`}>
      <i className="fas fa-times" onClick={() => {
        setIsActive(!isActive)
      }}></i>
      <div className="input-search-mobile-container">
        <input className="search-mobile-input" ref={inputRef} required />
        <label>Search for products</label>
      </div>
      <select className="select-search-mobile" ref={selectRef}>
        <option value="">All categories</option>
        {optionSelect.map((data, key) => (
          <option key={key}>{data}</option>
        ))}
      </select>
      <i
        className="fa fa-search"
        onClick={() => {
          setIsActive(!isActive);
          searchSubmit(inputRef, selectRef, history);
        }}
      ></i>
    </div>
  );
};

export default SearchMobile;
