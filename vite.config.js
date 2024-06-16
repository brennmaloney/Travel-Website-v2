import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
        outDir: 'public', // Ensure this is correctly set
    },
	plugins: [sveltekit()]
});