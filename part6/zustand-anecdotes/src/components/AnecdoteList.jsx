import { useAnecdotes, useAnecdoteActions, useFilter } from '../store/anecdoteStore'
import { useNotificationActions } from '../store/notificationStore'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { showNotification } = useNotificationActions()
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
    const { voteAnecdote, deleteAnecdote } = useAnecdoteActions()

    const filter = useFilter()

    const anecdotesToShow = sortedAnecdotes.filter(anecdote => {
        if (filter === '') return true
        return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })

    return (
        <div>
            {anecdotesToShow.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            voteAnecdote(anecdote.id)
                            showNotification(`You voted '${anecdote.content}'`)
                            console.log(`Voted anecdote with id ${anecdote.id}`)
                        }
                        }>vote</button>

                        <button onClick={() => {
                            deleteAnecdote(anecdote.id)
                            showNotification(`You deleted '${anecdote.content}'`)
                        }}>delete</button>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList