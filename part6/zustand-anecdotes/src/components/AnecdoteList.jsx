import { useAnecdotes, useAnecdoteActions, useFilter } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
    const { voteAnecdote } = useAnecdoteActions()

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
                        }
                        }>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList