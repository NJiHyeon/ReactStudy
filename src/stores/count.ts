import { create } from 'zustand'
import { combine } from 'zustand/middleware' //스토어 만들기기
import { subscribeWithSelector } from 'zustand/middleware' //데이터 수정하기기
import { persist } from 'zustand/middleware' //스토리지 저장

//1️⃣store 만들기
//create 함수 호출하고 콜백함수를 만든다음 반환한다.
export const useCountStore_make = create(
  //combine(객체, 콜백함수) = combine(상태/state, 액션/action)
  //combine 쓰면 타입 추론 가능
  combine(
    {
      count: 0,
      double: 0
    },
    (set, get) => ({
      //increase: function () {}
      increase() {
        const { count } = get() //객체구조분해
        set({
          count: count + 1
        })
      },
      decrease() {
        //set 함수는 콜백 함수 추가 가능
        //매개변수 state. state에서 객체구조분해를 통해 꺼내기: { count }
        set(({ count }) => ({
          count: count - 1
        }))
      }
    })
  )
)

//2️⃣상태구독:데이터 수정하기
export const useCountStore_modify = create(
  subscribeWithSelector(
    combine(
      //아래 부분이 추후 함수가 호출되었을 때 s에 해당됨
      {
        count: 0,
        double: 0
      },
      (set, get) => ({
        //increase: function () {}
        increase() {
          const { count } = get() //객체구조분해
          set({
            count: count + 1
          })
        },
        decrease() {
          //set 함수는 콜백 함수 추가 가능
          //매개변수 state. state에서 객체구조분해를 통해 꺼내기: { count }
          set(({ count }) => ({
            count: count - 1
          }))
        }
      })
    )
  )
)
//useCountStore2는 함수면서 객체임
useCountStore_modify.subscribe(
  //선택자 함수
  state => state.count,
  //실행할 함수 (위에서 선택된 값이 아래 함수의 매개변수로 들어간다.)
  count => {
    useCountStore_modify.setState({
      //데이터 수정
      double: count * 2
    })
  }
)

//3️⃣스토리지 저장
export const useCountStore_store = create(
  persist(
    subscribeWithSelector(
      combine(
        //아래 부분이 추후 함수가 호출되었을 때 s에 해당됨
        {
          count: 0,
          double: 0
        },
        (set, get) => ({
          //increase: function () {}
          increase() {
            const { count } = get() //객체구조분해
            set({
              count: count + 1
            })
          },
          decrease() {
            //set 함수는 콜백 함수 추가 가능
            //매개변수 state. state에서 객체구조분해를 통해 꺼내기: { count }
            set(({ count }) => ({
              count: count - 1
            }))
          }
        })
      )
    ),
    { name: 'Count Store ' } //그 외에 세션 스토리지, 버전 등이 있다.
  )
)
useCountStore_store.subscribe(
  state => state.count,
  count => {
    useCountStore_store.setState({
      double: count * 2
    })
  }
)
