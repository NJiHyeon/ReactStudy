import { createBrowserRouter, RouterProvider } from 'react-router'

// import { requiresAuth } from './loaders/requiresAuth'
// import { guesstOnly } from '@/routes/loaders/guesstOnly'
//Barrel 파일 형태로 수정
import { requiresAuth, guesstOnly } from '@/routes/loaders'

import Default from './layouts/Default'
import Loader from '@/components/Loader'

import { dynamic } from '@/utils'
// import Home from './pages/Home'
// import About from './pages/About'
// import SignIn from './pages/SignIn'
// import Movies from './pages/Movies'
// import MovieDetails from './pages/MovieDetails'
// import NotFound from './pages/NotFound'
const Home = dynamic(() => import('@/routes/pages/Home'), {
  // error: () => <div>나만의 에러 메시지~</div>
  error: ({ error }) => {
    let message = ''
    if (error instanceof Error) message = error.message
    return <h1>에러가 발생했어유... {message}</h1>
  },
  loading: <Loader size={100} />
})
const About = dynamic(() => import('@/routes/pages/About'))
const SignIn = dynamic(() => import('@/routes/pages/SignIn'))
const Movies = dynamic(() => import('@/routes/pages/Movies'))
const MovieDetails = dynamic(() => import('@/routes/pages/MovieDetails'))
const NotFound = dynamic(() => import('@/routes/pages/NotFound'))

const Todos = dynamic(() => import('@/routes/pages/Todos'))

// https:://heropy.dev/ => /index.html
// https:://heropy.dev/about => /about/index.html => 리다이렉트 -> /index.html
// https:://heropy.dev/signin => /about/index.html => 리다이렉트 -> /index.html

//라우더 객체 생성
const router = createBrowserRouter([
  //라우트 객체를 관리하고자 하는 페이지 개수만큼 생성
  {
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/signin',
        //로그인했는데 로그인 페이지로 진입 불가
        element: <SignIn />,
        loader: guesstOnly
      },
      {
        path: '/movies',
        element: <Movies />,
        loader: requiresAuth, //로그인 하지 않으면 Movies 페이지로 이동 불가능
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      },
      {
        path: '/todos',
        element: <Todos />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

//라우팅 처리 및 화면 렌더링
export default function Router() {
  return <RouterProvider router={router} />
}
