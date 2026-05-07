import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import blogService from '../services/blogs'
import loginService from '../services/login'
import LoginForm from '../forms/LoginForm'

const LoginPage = ({ user, setUser, errorMessage, setErrorMessage, isError, setIsError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log('User logged in', user)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const message = exception?.response?.data?.error || 'Wrong username or password'
      setErrorMessage(message)
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  // If user is already logged in, redirect to home
  if (user !== null) {
    return <Navigate to="/" />
  }

  return (
    <div>

      {errorMessage && (<div className={isError ? 'error' : 'success'}>{errorMessage}</div>)}
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </div>
  )
}

export default LoginPage