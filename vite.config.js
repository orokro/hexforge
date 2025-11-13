/*
	vite.config.js
	--------------

	Set up Vite configuration for a React project with Emotion support.
*/

// imports
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			// enables Emotion's css prop, better labels, source maps
			babel: { plugins: ["@emotion"] }
		})
	]
});
