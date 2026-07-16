import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useSession } from '@my-interview/auth'

const LoginPage = () => {
  const { login, isAuthenticated } = useSession()
  const navigate = useNavigate()
  const [name, setName] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(name || 'Developer')
    navigate('/')
  }

  return (
    <section>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <button type="submit">Continue</button>
      </form>
    </section>
  )
}

export default LoginPage
