import { useState } from 'react'

const fruits = ['사과', '바나나', '체리', '딸기']

export default function App() {
  const [selected, setSelected] = useState<string[]>([])

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { options } = event.target
    const newSelected: string[] = []
    Array.from(options).forEach(option => {
      if (option.selected) {
        newSelected.push(option.value)
      }
    })
    setSelected(newSelected)
  }

  return (
    <>
      <select
        multiple
        value={selected}
        onChange={handleChange}
        style={{ width: '100px' }}>
        {fruits.map(fruit => (
          <option
            key={fruit}
            value={fruit}>
            {fruit}
          </option>
        ))}
      </select>
      <h2>{selected.join(', ')}</h2>
    </>
  )
}
