interface Props {
  children: React.ReactNode
  onClose: () => void
}

//{ children }: 슬롯
export default function Modal({ children, onClose }: Props) {
  //전체 화면을 덮는 영역, 그 영역을 어둡게 처리하는 배경, 화면 가운데 출력되는 내용으로 구성됨
  return (
    <div className="modal fixed top-0 left-0 flex h-screen w-screen items-center justify-center">
      <div
        className="overlay gb-black/70 absolute top-0 left-0 h-full w-full"
        onClick={() => onClose()}></div>
      <div className="content relative z-1 max-h-[calc(100%-100px)] w-max max-w-[500px] min-w-[100px] overflow-y-auto rounded-[10px] bg-white p-[20px]">
        {children}
      </div>
    </div>
  )
}
