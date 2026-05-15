import { useTodoStore } from '@/stores/todo'
//컴포넌트 가져오기
import TextField from '../TextField'
import Button from '../Button'

export default function TodoCreator() {
  const title = useTodoStore(s => s.title) //zustand가 스토어 전체 객체 상태를 넘겨준다.
  const isLoading = useTodoStore(s => s.isLoadingForCreate)
  const setTitle = useTodoStore(s => s.setTitle)
  const createTodo = useTodoStore(s => s.createTodo)

  return (
    <div className="flex gap-2">
      {/* 양방향 데이터 바인딩 */}
      <TextField
        disabled={isLoading}
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return //한글 입력 이슈 해결
          if (e.key === 'Enter') createTodo()
        }}
        placeholder="할 일을 입력하세요~"
      />
      <Button
        loading={isLoading}
        disabled={isLoading}
        onClick={() => createTodo()}>
        추가
      </Button>
    </div>
  )
}
