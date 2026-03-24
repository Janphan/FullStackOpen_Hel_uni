const NotificationMessage = ({ message, type = "success" }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${type === "error" ? "notification-error" : "notification-success"}`}>
            {message}
        </div>
    )
}

export default NotificationMessage;