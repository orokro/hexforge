/*
	RootLayout.jsx
	--------------

	The top-most component (outside of App.jsx itself) to layout the editors UI structure.
*/

// react imports
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// constants and globals

// main export
export const RootLayout = ({ children }) => {

	return (
		<div 
			css={style}
			data-ui="RootLayout" 
			className="root-layout"
		>
			{children}
		</div>
	);
}

// 100% of styles here defined in one big CSS block, for all the parts of the template
const style = css`
	
	.root-layout {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
`;
