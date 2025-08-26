import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default function AdminHomePage() {
  const cookieStore = cookies()
  const isAuthed = cookieStore.get('admin_auth')?.value === '1'
  if (!isAuthed) redirect('/admin/login')

  return <DashboardClient />
}
