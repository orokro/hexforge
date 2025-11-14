/*
	App.jsx
	-------

	Bootstraps the editor: UI layout + R3F scene root.
*/

// imports
import React from "react";
import Root from "./scene/Root";
import RootLayout from "./ui/RootLayout";

// constants and globals
// (none)

const App = () => {
	return (
		<div data-ui="App" className="app">
			<RootLayout>
				<Root />
			</RootLayout>
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
