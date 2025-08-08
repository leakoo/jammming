import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import "./search-bar.css";

const SearchBar = (props) => {
  const [Search, setSearch] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    };

    if (Search.trim() !== "") {
      props.onSearch(Search);
    } else {
      alert("Please enter a song name");
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter Song Name"
        value={Search}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        required
      />
      
      <button 
        className="searchButton" 
        type="button" 
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
