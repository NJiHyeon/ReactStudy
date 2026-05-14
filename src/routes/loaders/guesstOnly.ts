import { redirect } from 'react-router'
import { validateUser } from '@/utils'

export default function guesstOnly() {
  if (validateUser()) {
    return redirect('/')
  }
  return true
}
