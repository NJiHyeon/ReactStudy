import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from './layouts/Default'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import NotFound from './pages/NotFound'

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
        element: <SignIn />
      },
      {
        path: '/movies',
        element: <Movies />,
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
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
