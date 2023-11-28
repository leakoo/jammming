import React, { useState } from "react";
import '../Styles/searchBar.css'

function SearchBar() {
    const {query, Setquery} = useState("");

    return (
        <div className="searchBar"> 
            <input type="text" placeholder="Search"/>
        </div>
    )
}

export default SearchBar;