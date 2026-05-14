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

export async function requiresAuth({ request }: Context) {
  // request.url //http:://localhost.5175/movies
  if (validateUser()) {
    return true
  }
  return redirect('/signin')
}
