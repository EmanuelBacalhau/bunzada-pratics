import { fastify as Fastify } from 'fastify'
import { env } from '../env'
import { routes } from './routes'

const app = Fastify()

app.register(routes)

app.listen(
  {
    port: env.PORT,
  },
  () => {
    const messageLog =
      env.NODE_ENV !== 'development'
        ? '🚀 Server running'
        : `🚀 Server running on http://localhost:${env.PORT}`

    console.log(messageLog)
  }
)
