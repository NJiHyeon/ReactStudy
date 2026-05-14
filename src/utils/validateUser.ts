export default function validateUser() {
  const accessToekn = localStorage.getItem('samsung_token')
  //토큰 분석...
  //인증 여부 확인
  const isValid = !!accessToekn
  return isValid
}
