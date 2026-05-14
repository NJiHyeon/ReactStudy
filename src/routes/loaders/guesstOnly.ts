import { redirect } from 'react-router'
import { validateUser } from '@/utils'

export async function guesstOnly() {
  if (validateUser()) {
    return redirect('/')
  }
  return true
}
