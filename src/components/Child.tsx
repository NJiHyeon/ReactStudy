import Parent from './Parent.tsx'

export default function Child() {
  const abc = 123
  return (
    <>
      {/* Prop */}
      <Parent
        title={abc}
        name="word" //{'world'}랑 같다.
        onClick={() => console.log('Hello')}
      />
    </>
  )
}
