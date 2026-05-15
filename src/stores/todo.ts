import { create } from 'zustand'
import { combine, subscribeWithSelector } from 'zustand/middleware'
import axios from 'axios'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

export type FilterStatus = 'all' | 'todo' | 'done'

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
  subscribeWithSelector(
    combine(
      //state 부분
      {
        filterStatus: 'all' as FilterStatus,
        filteredTodos: [] as Todo[], //필터 상태에 따라 원본을 가져다 사용
        todos: [] as Todo[], //원본
        title: '',
        isLoadingForFetch: false,
        isLoadingForCreate: false //중복입력 방지 위함
      },
      (set, get) => {
        //action 부분
        function setFilterStatus(filterStatus: FilterStatus) {
          set({ filterStatus: filterStatus })
        }

        function setTitle(title: string) {
          set({ title }) //title: title와 동일
        }

        //불러오기
        async function fetchTodos() {
          try {
            set({ isLoadingForFetch: true })
            const { data } = await api.get('') //base URL 뒤에 ''가 붙는다.
            set({
              todos: data || []
            })
          } catch (error) {
            console.log('가져오기 에러', error)
          } finally {
            set({ isLoadingForFetch: false })
          }
        }

        //추가
        async function createTodo() {
          const { title } = get()
          if (!title.trim()) return
          try {
            set({ isLoadingForCreate: true }) //로딩 시작
            await api.post('', { title }) //요청 전송 (title:title과 같음)
            setTitle('')
            fetchTodos()
          } catch (error) {
            console.log('생성 에러:', error)
          } finally {
            set({ isLoadingForCreate: false }) //로딩 종료
          }
        }

        //저장
        async function updateTodo(todo: Todo) {
          await api.put(`/${todo.id}`, {
            title: todo.title,
            done: todo.done
          })
          fetchTodos()
        }

        //삭제
        async function deleteTodo(todo: Todo) {
          await api.delete(`/${todo.id}`)
          fetchTodos()
        }
        return {
          setTitle: setTitle,
          fetchTodos: fetchTodos,
          createTodo: createTodo,
          updateTodo: updateTodo,
          deleteTodo: deleteTodo,
          setFilterStatus: setFilterStatus
        }
      }
    )
  )
)

//필터링
function updateFilteredTodos() {
  const { todos, filterStatus } = useTodoStore.getState()
  useTodoStore.setState({
    filteredTodos: todos.filter(todo => {
      switch (filterStatus) {
        case 'todo':
          return !todo.done
        case 'done':
          return todo.done
        default:
          return true
      }
    })
  })
}
useTodoStore.subscribe(state => state.todos, updateFilteredTodos) //선택자함수, 실행할함수
useTodoStore.subscribe(state => state.filterStatus, updateFilteredTodos) //선택자함수, 실행할함수
