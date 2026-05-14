import SearchBar from '@/components/movies/SearchBar'
import MovieList from '@/components/movies/MovieList'
import { Outlet } from 'react-router'

export default function Movies() {
  return (
    <>
      <SearchBar />
      <MovieList />

      {/* 주소에 따른 자식 페이지가 출력됨 */}
      <Outlet />
    </>
  )
}
