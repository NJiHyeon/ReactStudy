import { useTodoStore } from '@/stores/todo'
import { useEffect } from 'react'
import Loader from '@/components/Loader'
import TodoItem from '@/components/todos/TodoItem' //./TodoItem

export default function TodoList() {
  const todos = useTodoStore(s => s.filteredTodos)
  const isLoading = useTodoStore(s => s.isLoadingForFetch)
  const fetchTodos = useTodoStore(s => s.fetchTodos)

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        /> //키 속성은 map 메소드 안에 붙여야 한다.
      ))}
      {isLoading && <Loader size={100} />}
    </>
  )
}
