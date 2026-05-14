import { useCountStore } from './stores/count'

export default function App() {
  const count = useCountStore(s => s.count)
  const increase = useCountStore(s => s.increase)
  const decrease = useCountStore(s => s.decrease)
  return (
    <>
      <h1>{count}</h1>
      <button
        onClick={() => {
          increase()
        }}>
        증가
      </button>
      <button
        onClick={() => {
          decrease()
        }}>
        감소
      </button>
    </>
  )
}
