const NameInput = ({newName, handleNameChange }) => {
    return (
        <>
            <div>
                Name: <input value={newName} onChange={handleNameChange} />
            </div>
        </>
    )
}

export default NameInput;