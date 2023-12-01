import React, { useState } from "react";
import './SearchBar.css'

function SearchBar() {
    const {query, setQuery} = useState("");

    return (
        <>
            <div className="searchBar"> 
                <input type="text" placeholder="Enter Song Name" />
            </div>
            <div className="searchButton">
                <button>SEARCH</button>
            </div>
        </>
    )
}

export default SearchBar;