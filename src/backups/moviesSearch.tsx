import { useState, useEffect, Fragment } from 'react'

export interface ResponseValue {
  Search: Movie[]
  totalResults: string
  Response: string
}

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchText, setSearchText] = useState('')

  async function fetchMovies() {
    if (searchText.trim().length < 3) return
    const res = await fetch(
      `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
    )
    const data: ResponseValue = await res.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    console.log('Movies 배열이 변경되었습니다.', movies)
  }, [movies])

  return (
    <>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              fetchMovies()
            }
          }}
        />
        <button onClick={() => fetchMovies()}>검색</button>
      </div>
      {movies.map(movie => (
        //리턴값이 여러개 이므로 Fragment 사용
        <Fragment key={movie.imdbID}>
          <div>{movie.Title}</div>
          <img
            src={movie.Poster}
            alt={movie.Title}
          />
        </Fragment>
      ))}
    </>
  )
}
