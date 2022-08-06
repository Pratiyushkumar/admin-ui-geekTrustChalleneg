import React from "react";
import "./searchInput.css";
import "../themes.css";

const SearchInput = ({ debounceSearch, searchText }) => {
  return (
    <>
      <div className="search__container">
        <input
          type="search"
          name=""
          id=""
          value={searchText}
          className="search__box"
          placeholder="Search by name,email or role"
          onChange={(e) => debounceSearch(e.target.value)}
        />
      </div>
    </>
  );
};
export default SearchInput;
