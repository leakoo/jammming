import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [Search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (Search.trim() !== "") {
      props.onSearch(Search);
    } else {
      alert("Please enter a song name");
    }
    props.onSearch(Search);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter Song Name"
        value={Search}
        onChange={handleInputChange}
        required
      />

      <div className="searchButton-container">
        <button className="searchButton" onClick={handleSearch}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
