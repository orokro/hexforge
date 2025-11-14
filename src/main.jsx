/*
	main.jsx
	--------

	Vite entry that mounts App.
*/

// imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// constants and globals
// (none)

const Root = () => <App />;

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);

// 100% of styles here defined in one big CSS block, for all the parts of the template
const css = `
/* entry has no styles */
`
