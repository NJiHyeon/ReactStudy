import { useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('')

  return (
    <>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      {/* 데이터 보간 */}
      {message.trim() && <div>입력된 내용이 있어요~</div>}
    </>
  )
}
