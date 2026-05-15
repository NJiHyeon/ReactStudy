import { useTodoStore } from '@/stores/todo'

export default function TodoFilters() {
  const setFilterStatus = useTodoStore(s => s.setFilterStatus)
  return (
    <>
      <button onClick={() => setFilterStatus('all')}>전체</button>
      <button onClick={() => setFilterStatus('todo')}>할 일</button>
      <button onClick={() => setFilterStatus('done')}>완료</button>
    </>
  )
}
