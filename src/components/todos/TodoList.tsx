import { useTodoStore } from '@/stores/todo'
import { useEffect } from 'react'
import Loader from '@/components/Loader'

export default function TodoList() {
  const todos = useTodoStore(s => s.todos)
  const isLoading = useTodoStore(s => s.isLoadingForFetch)
  const fetchTodos = useTodoStore(s => s.fetchTodos)

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
      {isLoading && <Loader size={100} />}
    </>
  )
}
