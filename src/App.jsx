/*
	App.jsx
	-------

	Bootstraps the editor: UI layout + R3F scene root.
*/

// react imports
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// component imports
import { RootLayout } from "./components/ui/RootLayout";

// constants and globals
// (none)

const App = () => {
	return (
		<div 
			data-ui="App"
			className="app"
			css={style}
		>
			<RootLayout></RootLayout>
		</div>
	);
};

export default App;

// 100% of styles here defined in one big CSS block, for all the parts of the template
const style = css`

	[data-ui="App"].app{
		position: fixed;
		inset: 0;
	}
`;

