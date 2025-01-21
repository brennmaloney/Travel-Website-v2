import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import vitePluginString from 'vite-plugin-string'

export default defineConfig({
	server: {
		fs: {
			strict: false,
		}
	},
	build: {
		sourcemap: false,
	},
	plugins: [
		sveltekit(),
		vitePluginString()
	],
	optimizeDeps: {
		exclude: ['contentful']
	}
});