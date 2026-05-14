import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from './layouts/Default'
import { requiresAuth } from './loaders/requiresAuth'
import { guesstOnly } from '@/routes/loaders/guesstOnly'

import { lazy, Suspense } from 'react'
// import Home from './pages/Home'
// import About from './pages/About'
// import SignIn from './pages/SignIn'
// import Movies from './pages/Movies'
// import MovieDetails from './pages/MovieDetails'
// import NotFound from './pages/NotFound'
const Home = lazy(() => import('@/routes/pages/Home'))
const About = lazy(() => import('@/routes/pages/About'))
const SignIn = lazy(() => import('@/routes/pages/SignIn'))
const Movies = lazy(() => import('@/routes/pages/Movies'))
const MovieDetails = lazy(() => import('@/routes/pages/MovieDetails'))
const NotFound = lazy(() => import('@/routes/pages/NotFound'))

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
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Home />
          </Suspense>
        )
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        )
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
