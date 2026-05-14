//immer

import { create } from 'zustand'
import { combine } from 'zustand/middleware' //타입추론
import { immer } from 'zustand/middleware/immer' //데이터변경

create(
  immer(
    combine(
      {
        user: {
          name: 'HEROPY',
          address: {
            city: 'Suwon',
            emails: ['aa@gmail.com', 'bb@naver.com']
          }
        }
      },
      (set, get) => ({
        setUserFirstEmail(newEmail: string) {
          set(state => {
            state.user.address.emails[0] = newEmail
          })
        }
      })
    )
  )
)
