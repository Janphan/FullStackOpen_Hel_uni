const NameInput = ({ newName, handleNameChange }) => {
    return (
        <>
            <label className="field-row" htmlFor="newName">
                <span className="field-label">Name</span>
                <input id="newName" className="text-input" value={newName} onChange={handleNameChange} />
            </label>
        </>
    )
}

export default NameInput;