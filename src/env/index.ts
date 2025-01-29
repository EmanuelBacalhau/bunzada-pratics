import { z } from 'zod'

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  GEMINI_API_KEY: z.string().nonempty(),
})

const { success, data, error } = EnvSchema.safeParse(Bun.env)

if (!success) {
  console.error('❌ Invalid environment variables')
  console.log(error.flatten().fieldErrors)

  throw new Error('Invalid environment variables')
}

export const env = data
