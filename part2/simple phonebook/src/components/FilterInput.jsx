import { useState } from "react";

const FilterInput = ({searchName, handleSearch}) => {
    
    return (
        <>
        <form>Filter Name with a <input value={searchName} onChange={handleSearch} /></form>
        </>
    )
}

export default FilterInput;