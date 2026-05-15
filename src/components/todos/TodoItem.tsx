import type { Todo } from '@/stores/todo'
import { useState, useRef, useEffect } from 'react'

interface Props {
  todo: Todo
}

export default function TodoItem({ todo }: Props) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null) //input 요소에 연결된다는 타입 이해할 수 있음

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus() //수정 버튼 누르면 자동 포커스
    }
  }, [isEditMode])

  function onEditMode() {
    setIsEditMode(true) //데이터만 수정
    // setter는 비동기적으로 동작한다. 데이터가 변경됐다고 해서 화면이 바로 변경됨을 보장하지 않는다.
    // 따라서 아래 포커스 상황이 발생하지 않는다.
    // useEffect 사용
    // inputRef.current?.focus() => useEffect 내로 이동
  }

  function offEditMode() {
    setIsEditMode(false)
    setTitle(todo.title) //취소하면 원래대로 돌려놓기
  }

  return (
    <div className="flex items-center gap-2">
      {isEditMode ? (
        //수정모드
        <>
          <input
            type="checkbox"
            checked={todo.done}
          />
          <input
            ref={inputRef} //참조걸기
            type="text"
            value={title} //todo.title로 하면 수정입력 안됨!
            onChange={e => setTitle(e.target.value)}
          />
          <button onClick={() => offEditMode()}>취소</button>
          <button>저장</button>
          <button>삭제</button>
        </>
      ) : (
        //일반모드
        <>
          <input
            type="checkbox"
            checked={todo.done}
          />
          <h3 className="grow">{todo.title}</h3>
          <button onClick={() => onEditMode()}>수정</button>
        </>
      )}
    </div>
  )
}
