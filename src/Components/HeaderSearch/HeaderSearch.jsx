import './HeaderSearch.css';

import { optionSelect } from '../../Epics/Share';
import React from 'react';
import { searchSubmit } from '../../Epics/User';

function HeaderSearch({ selectRef, inputRef, history }) {
  return (
    <div className="header__select-search">
      <select ref={selectRef} style={{ outline: "none" }}>
        <option value="">All Categories</option>
        {optionSelect.map((data, key) => (
          <option key={key}>{data}</option>
        ))}
      </select>
      <input
        placeholder="Search for products"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            searchSubmit(inputRef, selectRef, history);
          }
        }}
      />
      <i
        className="fas fa-search"
        onClick={() => {
          searchSubmit(inputRef, selectRef, history);
        }}
      ></i>
    </div>
  );
}

export default HeaderSearch;