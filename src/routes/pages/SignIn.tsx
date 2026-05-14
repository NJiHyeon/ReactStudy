import TextField from '@/components/TextField'
import Button from '@/components/Button'
import { useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'

export default function SignIn() {
  //훅은 최상단에서 사용 가능하므로 여기서 함수 얻기
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [searchParams] = useSearchParams() //setSearchParams는 사용하지 않으므로 뺌뺌
  const returnUrl = searchParams.get('returnUrl') // '/movies'

  function signIn() {
    //1.서버로 ID/PW 전송 => ID/PW 검사 => 로그인 승인 => 정상 응답(사용자 정보 + 엑세스 토큰)
    if (id && pw) {
      //로그인 완료 가정
      const accessToken = '사용자이름:노지현,나이:28,이메일:aaa@gmail.com,...' //서버에서 응답받은 토큰 정보
      localStorage.setItem('samsung_token', accessToken) //토큰 저장
    }
    //2.페이지 이동
    //navigate('/', { replace: true }): 내역을 쌓지 않으면서 이동
    //navigate(n): n칸 앞으로 이동
    navigate(returnUrl || '/')

    //로그인 실패 시 처리
    //...
  }

  return (
    <>
      <h1>Log In Page!</h1>
      <form
        className="flex max-w-[300px] flex-col gap-2"
        onSubmit={event => {
          event.preventDefault()
        }}>
        <TextField
          label="ID"
          value={id}
          onChange={e => setId(e.target.value)}
        />
        <TextField
          label="PW"
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />
        <Button onClick={() => signIn()}>로그인</Button>
      </form>
    </>
  )
}
