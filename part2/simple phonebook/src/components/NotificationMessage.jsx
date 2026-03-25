const NotificationMessage = ({ message, type = "success" }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={`notification ${type === "error" ? "notification-error" : "notification-success"}`}
            style={styles[type]}>
            {message}
        </div>
    )
}

const styles = {
    success: {
        color: '#16a34a',
        background: '#d1fae5',
        border: '1px solid #a7f3d0',
    },
    error: {
        color: '#b91c1c',
        background: '#fee2e2',
        border: '1px solid #fca5a5',
    }
};
export default NotificationMessage;