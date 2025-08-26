import LoginForm from '@/components/LoginForm'
import Head from 'next/head'

export default function AdminLoginPage() {
  return (
    <>
      <Head>
        <title>Admin Login - Pharbit</title>
        <meta name="description" content="Admin authentication portal" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <LoginForm />
    </>
  )
}
