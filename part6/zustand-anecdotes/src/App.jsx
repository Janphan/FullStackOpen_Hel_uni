
import { useAnecdotes } from './store'
import { useAnecdoteActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { voteAnecdote, addAnecdote } = useAnecdoteActions()
  const vote = id => {
    voteAnecdote(id)
  }
  const addAnecdoteHandler = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    addAnecdote(content)
    e.target.reset()
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdoteHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div >
  )
}

export default App