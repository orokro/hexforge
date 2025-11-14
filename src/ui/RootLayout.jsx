/*
	RootLayout.jsx
	--------------

	Layers UI over the canvas and wires the Export button.
*/

// imports
import React, { useCallback } from "react";
import Toolbar from "./Toolbar";
import ToolPanel from "./ToolPanel";
import { useStore } from "../store";
import { exportJSON } from "../lib/export";

// constants and globals
// (none)

const RootLayout = ({ children }) => {
	const meta = useStore((s) => s.meta);
	const cells = useStore((s) => s.cells);

	const onExport = useCallback(() => {
		const payload = exportJSON(meta, cells);
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "hexforge-export.json";
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}, [meta, cells]);

	// wire toolbar button by id to keep Toolbar dumb
	React.useEffect(() => {
		const btn = document.getElementById("export-json");
		if (!btn) return;
		btn.onclick = onExport;
		return () => { btn.onclick = null; };
	}, [onExport]);

	return (
		<div data-ui="RootLayout" className="root">
			{children}
			<Toolbar />
			<ToolPanel />
			<style>{css}</style>
		</div>
	);
};

export default RootLayout;

// 100% of styles here defined in one big CSS block, for all the parts of the template
const css = `
[data-ui="RootLayout"].root{
	position: fixed;
	inset: 0;
	overflow: hidden;
	font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji;
}
`
