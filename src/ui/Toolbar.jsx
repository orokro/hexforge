/*
	Toolbar.jsx
	-----------

	Top toolbar: tool switching + export skeleton.
*/

// imports
import React from "react";
import { useStore } from "../store";

// constants and globals
// (none)

const Toolbar = () => {
	const tool = useStore((s) => s.activeTool);
	const setTool = useStore((s) => s.setTool);

	return (
		<div data-ui="Toolbar" className="toolbar">
			<div className="title">HexForge</div>
			<div className="tools">
				<button data-active={tool === "sculpt"} onClick={() => setTool("sculpt")}>Sculpt</button>
				<button data-active={tool === "paint"} onClick={() => setTool("paint")}>Paint</button>
				<button data-active={tool === "inspect"} onClick={() => setTool("inspect")}>Inspect</button>
			</div>
			<div className="spacer" />
			{/* Export button hooks into App */}
			<button id="export-json">Export</button>
			<style>{css}</style>
		</div>
	);
};

export default Toolbar;

// 100% of styles here defined in one big CSS block, for all the parts of the template
const css = `
[data-ui="Toolbar"].toolbar{
	position: absolute;
	top: .5rem;
	left: .5rem;
	right: .5rem;
	height: 3rem;
	display: flex;
	align-items: center;
	gap: .5rem;
	padding: .5rem;
	border: 1px solid #e5e7eb;
	border-radius: .75rem;
	background: rgba(255,255,255,.85);
	backdrop-filter: blur(6px);
}

[data-ui="Toolbar"] .title{
	font-weight: 700;
	padding: 0 .25rem;
}

[data-ui="Toolbar"] .tools{
	display: grid;
	grid-auto-flow: column;
	gap: .5rem;
}

[data-ui="Toolbar"] button{
	padding: .4rem .75rem;
	border: 1px solid #e5e7eb;
	border-radius: .5rem;
	background: #fff;
	cursor: pointer;
}
[data-ui="Toolbar"] button[data-active="true"]{
	background: #111827;
	color: #fff;
}
[data-ui="Toolbar"] .spacer{ flex: 1; }
`
