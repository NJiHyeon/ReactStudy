import { useTodoStore } from '@/stores/todo'
//컴포넌트 가져오기
import TextField from '../TextField'
import Button from '../Button'

export default function TodoCreator() {
  const title = useTodoStore(s => s.title) //zustand가 스토어 전체 객체 상태를 넘겨준다.
  const setTitle = useTodoStore(s => s.setTitle)

  return (
    <div className="flex gap-2">
      {/* 양방향 데이터 바인딩 */}
      <TextField
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요~"
      />
      <Button>추가</Button>
    </div>
  )
}
