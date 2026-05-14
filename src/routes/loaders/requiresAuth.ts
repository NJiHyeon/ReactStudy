//로그인 안하면 못들어가게 하기 위함

//ts 파일에서 요소/컴포넌트는 하나의 데이터로서 취급이 안된다.
//따라서 Link는 컴포넌트이므로 사용 불가
//또한 Link는 사용자가 클릭을 해야하므로 적합하지 않음.
//그러면 useNavigate와의 차이점은? use는 훅이고, 훅은 컴포넌트 함수 안에서만 사용 가능하다.
import { redirect } from 'react-router'
import { validateUser } from '@/utils'

interface Context {
  request: Request
}

export function requiresAuth({ request }: Context) {
  //사용자가 로그인 전 Movies 페이지로 접근했다고 가정 => 로그인 후 Home이 아닌 Movies로 이동해야 함.
  //request.url: http:://localhost.5175/movies
  const url = new URL(request.url) //객체 데이터 반환
  if (validateUser()) {
    return true
  }
  return redirect(`/signin?returnUrl=${url.pathname}`) //url.pathname: '/movies'
}
