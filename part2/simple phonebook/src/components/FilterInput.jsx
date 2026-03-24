const FilterInput = ({ searchName, handleSearch }) => {
    return (
        <>
            <form className="filter-form">
                <label className="field-row" htmlFor="filterName">
                    <span className="field-label">Filter</span>
                    <input
                        id="filterName"
                        className="text-input"
                        value={searchName}
                        onChange={handleSearch}
                        placeholder="Search by name"
                    />
                </label>
            </form>
        </>
    )
}

export default FilterInput;