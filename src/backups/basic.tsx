import { useState } from 'react'

export default function App() {
  // 반응형 데이터
  const [count, setCount] = useState(0) //구조분해 할당
  const [isActive, setIsActive] = useState(false)
  const [color, setColor] = useState('')

  return (
    //Fragment
    <>
      {/* HTML Class 바인딩 */}
      <h1 className={isActive ? 'active' : ''}>{count}</h1>

      {/* HTML Style 바인딩 */}
      <h2 style={{ color: color }}>Hello React!</h2>
      <input
        type="text"
        value={color}
        onChange={event => {
          setColor(event.target.value)
        }}
      />

      <button
        onClick={() => {
          setIsActive(!isActive)
        }}>
        토글
      </button>

      <input
        type="number"
        value={count} //읽기전용
        onChange={event => {
          setCount(Number(event.target.value)) //UI 수정을 위함
        }}
      />

      <button
        onClick={() => {
          const value = count + 1
          setCount(value) //UI와 콘솔 로그를 같게 만들기 위함
          console.log(value)
        }}>
        클릭
      </button>
    </>
  )
}
