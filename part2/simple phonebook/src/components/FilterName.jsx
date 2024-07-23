import { useState } from "react";
import PersonsList from "./PersonsList";
import FilterInput from "./FilterInput";

export default function FilterName({ searchName, setSearchName }) {
    

    const handleSearch = (event) => {
        console.log("search", event.target.value);
        setSearchName(event.target.value);
        setShowAll(false);
    }

    return (
        <>
            <FilterInput searchName={searchName} handleSearch={handleSearch} />
            
        </>
    )
}