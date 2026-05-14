import { useState } from 'react'

export default function App() {
  const [state, setState] = useState<'loading' | 'success' | ''>('')

  function renderStateMessage() {
    if (state === 'loading') {
      return <h2>로딩 중입니다.</h2>
    } else if (state === 'success') {
      return <h2>성공적으로 완료되었습니다.</h2>
    } else {
      return <h2>대기 중입니다.</h2>
    }
  }

  return (
    <>
      <button onClick={() => setState('loading')}>로딩!</button>
      <button onClick={() => setState('success')}>성공!</button>
      {renderStateMessage()}
    </>
  )
}
