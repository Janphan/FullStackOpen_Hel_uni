import { useNotification } from '../store/notificationStore'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  const message = useNotification()
  if (!message) return null
  console.log(message)

  return <div style={style}>{message}</div>
}

export default Notification