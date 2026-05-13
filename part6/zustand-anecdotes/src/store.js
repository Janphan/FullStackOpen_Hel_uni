
import { create } from 'zustand'
import { anecdotesAtStart } from './anecdotesData'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  filter: '',
  actions: {
    addAnecdote: (anecdote) => set((state) => ({
      anecdotes: [...state.anecdotes, asObject(anecdote)]
    })),
    voteAnecdote: (id) => set((state) => ({
      anecdotes: state.anecdotes.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    })),
    setFilter: value => set(() => ({ filter: value }))
  },

}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)