import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useAnecdoteActions } from './store/anecdoteStore'
import Notification from './components/Notification'
const App = () => {
  const { initialize } = useAnecdoteActions()
  useEffect(() => {
    console.log('initialize from store:', initialize)
    initialize()
  }, [initialize])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App