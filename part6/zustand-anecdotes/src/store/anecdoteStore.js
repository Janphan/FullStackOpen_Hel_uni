
import { create } from 'zustand'
import anecdotesService from '../services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addAnecdote: (anecdote) => set((state) => ({
      anecdotes: state.anecdotes.concat(anecdote)
    })),
    voteAnecdote: async (id) => {
      const anecdoteToUpdate = get().anecdotes.find(a => a.id === id)
      if (anecdoteToUpdate) {
        const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
        await anecdotesService.update(id, updatedAnecdote)
        set((state) => ({
          anecdotes: state.anecdotes.map(a => a.id === id ? updatedAnecdote : a)

        }))
      }
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdotesService.getAll()
      console.log("Data from server", anecdotes);
      set(() => ({ anecdotes }))
    },
    deleteAnecdote: async (id) => {
      const anecdoteToDelete = get().anecdotes.find(a => a.id === id)
      const confirmed = window.confirm(`Are you sure you want to delete "${anecdoteToDelete.content}"? Only anecdote with 0 votes can be deleted!`)
      if (!confirmed) return
      await anecdotesService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    }
  },

}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
