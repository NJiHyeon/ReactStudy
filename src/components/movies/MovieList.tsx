import { useMovieStore } from '@/stores/movie'
import { Link } from 'react-router'

export default function MovieList() {
  const movies = useMovieStore(s => s.movies)
  return (
    <ul className="flex flex-wrap gap-5">
      {movies.map(movie => (
        //리턴값이 여러개 이므로 Fragment 사용
        <li
          key={movie.imdbID}
          title={movie.Title}
          className="w=[180px]">
          {/* 주소 동적 처리가 필요함 */}
          <Link to={`/movies/${movie.imdbID}`}>
            <div className="truncate font-bold">{movie.Title}</div>
            <img
              src={movie.Poster}
              alt={movie.Title}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
