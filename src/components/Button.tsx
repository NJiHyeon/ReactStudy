interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...restProps }: Props) {
  return (
    <button
      className="h-[36px] min-w-[100px] cursor-pointer rounded-lg bg-blue-500 text-white duration-200 hover:bg-blue-400"
      {...restProps}>
      {children}
    </button>
  )
}
