import { Fragment, useState } from 'react'

const fruits = ['사과', '바나나', '체리', '딸기']

export default function App() {
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target //input 요소
    return checked
      ? setCheckedItems([...checkedItems, value]) // 체크한 경우
      : setCheckedItems(checkedItems.filter(item => item !== value)) // 체크 해제한 경우
  }

  return (
    <>
      <p>좋아하는 과일을 모두 골라보세요~</p>
      {fruits.map(fruit => (
        <Fragment key={fruit}>
          <label>
            <input
              type="checkbox"
              value={fruit}
              checked={checkedItems.includes(fruit)}
              onChange={handleCheckboxChange}
            />
            {fruit}
          </label>
          <br />
        </Fragment>
      ))}
      <h2>{checkedItems.join(', ')}</h2>
    </>
  )
}
