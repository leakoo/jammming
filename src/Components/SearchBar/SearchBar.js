import React, { useState } from "react";
import './SearchBar.css'

const SearchBar = () => {

    return (
        <>
      <div className="searchBar">
        <input type="text" placeholder="Enter Song Name" />
      </div>
            <div className="searchButton-container">
                <button className="searchButton">
                  SEARCH
                </button>
            </div>
    </>   
    )
}

export default SearchBar;