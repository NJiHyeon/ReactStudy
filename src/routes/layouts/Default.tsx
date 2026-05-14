import Header from '@/components/Header'
import { Outlet, ScrollRestoration } from 'react-router'

export default function Default() {
  return (
    <>
      <Header />
      <ScrollRestoration />

      {/* 주소에 따른 자식 페이지가 출력됨 */}
      <Outlet />
    </>
  )
}
