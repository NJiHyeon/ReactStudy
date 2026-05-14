import { useState } from 'react'

export default function App() {
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }

  return (
    <>
      {isActive ? (
        <h1>활성화 - {String(isActive)}</h1> //isActive는 bool이므로 문자화 필요
      ) : (
        <h1>비활성화 - {String(isActive)}</h1>
      )}
      <button onClick={toggle}>토글</button>
    </>
  )
}
