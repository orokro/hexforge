/*
	App.jsx
	-------

	Bootstraps the editor: UI layout + R3F scene root.
*/

// imports
import React from "react";

// constants and globals
// (none)

const App = () => {
	return (
		<div data-ui="App" className="app">
			hi
			<style>{css}</style>
		</div>
	);
};

export default App;

// 100% of styles here defined in one big CSS block, for all the parts of the template
const css = `
	[data-ui="App"].app{
		position: fixed;
		inset: 0;
	}
`
