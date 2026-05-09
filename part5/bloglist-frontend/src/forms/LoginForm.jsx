import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={handleSubmit}>
        <div>

          <TextField
            value={username}
            onChange={handleUsernameChange}
            placeholder="username"
            variant="standard"
            sx={{ mb: 2, maxWidth: 300 }}
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
            variant="standard"
            sx={{ mb: 2, maxWidth: 300 }}
          />
        </div>
        <Button type="submit" name="login" variant="contained">
          login
        </Button>
      </form >
    </div >
  )
}
export default LoginForm