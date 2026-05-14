export default function App() {
  const fruits = ['사과', '바나나', '체리']
  const renderFruits = fruits.map((fruit, index) => (
    <li key={index}>{fruit}</li>
  ))

  return (
    <>
      <h1>과일 리스트</h1>
      <ul>{renderFruits}</ul>
    </>
  )
}
