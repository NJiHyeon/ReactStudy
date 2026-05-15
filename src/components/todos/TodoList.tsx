import { useTodoStore } from '@/stores/todo'
import { useEffect } from 'react'

export default function TodoList() {
  const todos = useTodoStore(s => s.todos)
  const fetchTodos = useTodoStore(s => s.fetchTodos)

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  )
}
