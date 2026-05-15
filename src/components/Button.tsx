import Loader from '@/components/Loader'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
}

export default function Button({
  children,
  loading = false, //디폴트 값 설정
  ...restProps //나머지 요소들이 들어올 수도
}: Props) {
  return (
    <button
      className="relative h-[36px] min-w-[100px] cursor-pointer rounded-lg bg-blue-500 text-white duration-200 hover:bg-blue-400"
      {...restProps}>
      {loading ? <Loader color="white" /> : children}
    </button>
  )
}
