import { useAnecdoteActions } from '../store/anecdoteStore'
import anecdotesService from '../services/anecdotes'
import { useNotificationActions } from '../store/notificationStore'

export const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()
  const { showNotification } = useNotificationActions()

  const addAnecdoteHandler = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const newAnecdote = await anecdotesService.createNew(content)
    addAnecdote(newAnecdote)
    showNotification(`You created '${content}'`)
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdoteHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
