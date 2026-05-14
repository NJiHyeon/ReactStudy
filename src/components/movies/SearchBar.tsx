import { useMovieStore } from '@/stores/movie' //훅 가져오기

export default function SearchBar() {
  //한 번에 하나씩만 꺼내기
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const fetchMovies = useMovieStore(s => s.fetchMovies)

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={event => setSearchText(event.target.value)}
        onKeyDown={event => {
          if (event.nativeEvent.isComposing) return
          if (event.key === 'Enter') {
            fetchMovies()
          }
        }}
      />
      <button onClick={() => fetchMovies()}>검색</button>
    </div>
  )
}
