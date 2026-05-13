import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useAnecdoteActions } from './store'
import anecdotesService from './services/anecdotes'
const App = () => {
  const { initialize } = useAnecdoteActions()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App