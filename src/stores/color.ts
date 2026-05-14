import { create } from 'zustand'

export const useColorStore = create(() => {
  return {
    color: 'red'
  }
})
