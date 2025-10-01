import react from '@vitejs/plugin-react'
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { z } from 'zod'
import { resolve } from 'path'

const envSchema = z.object({
	VITE_API_URL: z.string(),
	VITE_PORT: z.string().optional(), //* will parse to number later
})

export default defineConfig(({ mode }) => {
	//* Validate env variables with Zod
	const rawEnv = loadEnv(mode, process.cwd(), 'VITE_')
	const env = envSchema.parse(rawEnv)

	//* Merge validated env into process.env
	process.env = { ...process.env, ...env }

	return {
		plugins: [react(), tsconfigPaths(), reactScopedCssPlugin()],
		base: '',
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/variables" as *;`,
				},
			},
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
			},
		},
		build: {
			chunkSizeWarningLimit: 100,
			rollupOptions: {
				onwarn(warning, warn) {
					if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
						return
					}
					warn(warning)
				},
			},
		},
		server: {
			port: env.VITE_PORT ? +env.VITE_PORT : undefined,
		},
	}
})
