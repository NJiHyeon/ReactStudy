import type { Todo } from '@/stores/todo'
import { useState, useRef, useEffect } from 'react'
import { useTodoStore } from '@/stores/todo'

interface Props {
  todo: Todo
}

export default function TodoItem({ todo }: Props) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [done, setDone] = useState(todo.done)
  const inputRef = useRef<HTMLInputElement>(null) //input 요소에 연결된다는 타입 이해할 수 있음
  const updateTodo = useTodoStore(s => s.updateTodo)
  const deleteTodo = useTodoStore(s => s.deleteTodo)

  //데이터 감시 위함
  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus() //수정 버튼 누르면 자동 포커스
    }
  }, [isEditMode])

  useEffect(() => {
    if (done === todo.done) return //안하면 최초 한번 실행될 때 모든 값들이 전송된다.
    updateTodo({
      ...todo,
      done: done
    })
    //eslint-disable-next-line
  }, [done])

  function onEditMode() {
    setIsEditMode(true) //데이터만 수정
    // setter는 비동기적으로 동작한다. 데이터가 변경됐다고 해서 화면이 바로 변경됨을 보장하지 않는다.
    // 따라서 아래 포커스 상황이 발생하지 않는다. => useEffect 내에 inputRef.current?.focus() 사용
  }

  function offEditMode(isSave: boolean = false) {
    setIsEditMode(false)
    if (!isSave) setTitle(todo.title) //취소하면 원래대로 돌려놓기
  }

  function saveTodo() {
    if (!title.trim()) return //빈 값 전송X
    if (title.trim() === todo.title) return //같은 값 전송X
    updateTodo({
      ...todo,
      title: title,
      done: todo.done
    })
    offEditMode(true) //저장 후 다시 수정했을 때 원래대로 돌아가는 이슈 수정
  }

  return (
    <div className="flex items-center gap-2 hover:bg-gray-100">
      <input
        type="checkbox"
        checked={done} //todo.done을 하면 수정할 수 있는 권한이 없음 => 반응형 데이터 만들어주기
        onChange={e => setDone(e.target.checked)}
      />
      {isEditMode ? (
        //수정모드
        <>
          <input
            ref={inputRef} //참조걸기
            type="text"
            value={title} //todo.title로 하면 수정입력 안됨!
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => {
              if (e.nativeEvent.isComposing) return
              if (e.key === 'Enter') saveTodo()
              if (e.key === 'Escape') offEditMode()
            }}
          />
          <button onClick={() => offEditMode()}>취소</button>
          <button onClick={() => saveTodo()}>저장</button>
          <button onClick={() => deleteTodo(todo)}>삭제</button>
        </>
      ) : (
        //일반모드
        <>
          <h3 className="grow">{todo.title}</h3>
          <button onClick={() => onEditMode()}>수정</button>
        </>
      )}
    </div>
  )
}
