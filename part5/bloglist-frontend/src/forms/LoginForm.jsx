const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              value={username}
              onChange={handleUsernameChange}
              placeholder="username"
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="password"
            />
          </label>
        </div>
        <button type="submit" name="login">login</button>
      </form>
    </div>
  )
}

export default LoginForm