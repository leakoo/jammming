import React, { useState } from "react";
import './SearchBar.css'

const SearchBar = (props) => {
  const [Search, setSearch] = useState('');

  const handleInputChange= (event) => {
    setSearch(event.target.value);
  }

  const handleSearch = () => {
    props.onSearch(Search);
  }

    return (
      <div className="searchBar">
        <input type="text" placeholder="Enter Song Name" value={Search} onChange={handleInputChange}/>

        <div className="searchButton-container">
           <button className="searchButton" onClick={handleSearch}>
             SEARCH
            </button>
        </div>
        
      </div>
    )
}

export default SearchBar;