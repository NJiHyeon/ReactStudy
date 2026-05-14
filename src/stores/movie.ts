import { create } from 'zustand'
import { combine, devtools } from 'zustand/middleware' //타입추론 기능

export interface ResponseValue {
  Search?: Movie[]
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

//create(combine(상태:{반응형데이터}, 액션함수:() => ({}))) 시작
//useMovieStore: Hook 생성성
export const useMovieStore = create(
  devtools(
    combine(
      {
        movies: [] as Movie[], //타입단언(assertion)
        searchText: ''
      },
      (set, get) => ({
        //1)
        setSearchText(searchText: string) {
          //searchText: searchText 생략가능
          set({ searchText })
        },

        //2)
        // fetchMovies: async function () {} 대신 아래와 같이 수정 가능
        async fetchMovies() {
          const { searchText } = get()
          if (searchText.trim().length < 3) return //searchText 가져오는 get 함수 필요
          const res = await fetch(
            `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
          )
          const data: ResponseValue = await res.json()
          // setMovies(data.Search) 대신 set을 사용
          set({
            movies: data.Search || []
          })
        }
      })
    )
  )
)
