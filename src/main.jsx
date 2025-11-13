/*
	main.jsx
	--------

	Main bootstrap file for a React application using Vite.
*/

// react imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// styles
import './index.css'

// component imports
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
