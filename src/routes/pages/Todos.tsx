import TodoCreator from '@/components/todos/TodoCreator'
import TodoList from '@/components/todos/TodoList'
import TodoFilters from '@/components/todos/TodoFilters'

export default function Todo() {
  return (
    <>
      <TodoCreator />
      <TodoFilters />
      <TodoList />
    </>
  )
}
