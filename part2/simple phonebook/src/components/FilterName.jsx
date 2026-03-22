import FilterInput from "./FilterInput";

export default function FilterName({ searchName, setSearchName, setShowAll }) {
    const handleSearch = (event) => {
        console.log("search", event.target.value);
        setSearchName(event.target.value);
        if (typeof setShowAll === 'function') setShowAll(false);
    }

    return (
        <>
            <FilterInput searchName={searchName} handleSearch={handleSearch} />
        </>
    )
}