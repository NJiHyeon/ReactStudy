interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function TextField({ label, ...restProps }: Props) {
  return (
    <>
      <label className="flex items-center gap-1">
        {label && <span>{label}</span>}
        <input
          {...restProps}
          className={[
            'h-[36px] min-w-[200px] grow',
            'px-[10px]',
            'rounded-lg border border-gray-500'
          ].join(' ')}
        />
      </label>
    </>
  )
}
