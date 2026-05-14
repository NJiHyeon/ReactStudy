import { useState, useMemo } from 'react'

function getDouble(count) {
  return count * 2
}

export default function App() {
  const [count, setCount] = useState(0)
  const double = getDouble(count)

  return (
    <>
      <h1>count: {count}</h1>
      <h2>double: {double}</h2>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </>
  )
}
