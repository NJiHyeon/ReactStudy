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
      title: ''
    },
    (set, get) => ({
      //action
      setTitle(title: string) {
        set({ title }) //title: title와 동일
      },
      async fetchTodos() {
        const { data } = await api.get('') //base URL 뒤에 ''가 붙는다.
        set({
          todos: data || []
        })
      },
      async createTodo() {
        const { title } = get()
        if (!title.trim()) return
        const todo = api.post('', { title }) //요청 전송 (title:title과 같음)
        //목록 갱신: 1)생성된 투두 끼워넣기, 2)목록 다시 가져오기
      }
    })
  )
)
