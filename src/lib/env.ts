import { z } from 'zod'

// Same-origin deployments configure a root-relative path (e.g. `/api/v1`) instead of an
// absolute URL, so nginx can proxy the API without CORS and without baking a hostname in
// at build time.
const apiBaseUrlSchema = z
  .string()
  .refine((value) => value.startsWith('/') || z.url().safeParse(value).success, {
    message: 'VITE_API_BASE_URL must be an absolute URL or a path starting with "/"',
  })

const envSchema = z.object({
  VITE_API_BASE_URL: apiBaseUrlSchema,
  VITE_APP_NAME: z.string().min(1),
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${z.prettifyError(parsedEnv.error)}`)
}

export const env = parsedEnv.data
