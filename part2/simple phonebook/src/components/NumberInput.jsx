const NumberInput = ({ newNumber, handleNumberChange }) => {
    return (
        <>
            <label className="field-row" htmlFor="newNumber">
                <span className="field-label">Number</span>
                <input id="newNumber" className="text-input" value={newNumber} onChange={handleNumberChange} />
            </label>
        </>
    )
}

export default NumberInput;
