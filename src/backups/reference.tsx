import { useRef, useEffect } from 'react'

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  return (
    <>
      <input
        type="text"
        ref={inputRef}
      />
    </>
  )
}
