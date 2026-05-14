import { create } from 'zustand'
import { combine } from 'zustand/middleware' //타입추론
import { immer } from 'zustand/middleware/immer' //데이터변경

create(immer(combine({}, () => {})))
