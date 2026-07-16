import { MAIN_APP_URL } from '@my-interview/auth'

const HomePage = () => (
  <section>
    <h1>my-interview.tech</h1>
    <p>Prepare for your next interview with structured practice.</p>
    <p>
      <a href={`${MAIN_APP_URL}/login`}>Go to your account</a>
    </p>
  </section>
)

export default HomePage
