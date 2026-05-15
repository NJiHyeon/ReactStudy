import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import axios from 'axios'

interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

//커스텀 axios 생성
const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: 'KDT8_bcAWVpD8',
    username: 'KDT8_ParkYoungWoong'
  }
})

export const useTodoStore = create(
  combine(
    //state
    {
      todos: [] as Todo[],
      title: '',
      isLoading: false //중복입력 방지 위함
    },
    (set, get) => {
      //action
      function setTitle(title: string) {
        set({ title }) //title: title와 동일
      }
      async function fetchTodos() {
        const { data } = await api.get('') //base URL 뒤에 ''가 붙는다.
        set({
          todos: data || []
        })
      }
      async function createTodo() {
        const { title } = get()
        if (!title.trim()) return
        try {
          set({ isLoading: true }) //로딩 시작
          await api.post('', { title }) //요청 전송 (title:title과 같음)
          setTitle('')
          await fetchTodos()
        } catch (error) {
          console.log('생성 에러:', error)
        } finally {
          set({ isLoading: false }) //로딩 종료
        }
      }
      return {
        setTitle: setTitle,
        fetchTodos: fetchTodos,
        createTodo: createTodo
      }
    }
  )
)
