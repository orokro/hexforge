/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Header = () => (
    <div css={headerStyle}>
        <div className="left">HexForge</div>
        <div className="center">Untitled Map</div>
        <div className="right">Github</div>
    </div>
)

export const ToolIcons = () => (
    <div css={toolsStyle}>
        {/* Placeholder Icons */}
        <button>🏔️</button>
        <button>🎨</button>
        <button>🌲</button>
        <button>🧱</button>
    </div>
)

export const ToolPanel = () => (
    <div css={panelStyle}>
        <h3>Current Tool</h3>
        <p>Settings placeholder...</p>
    </div>
)

// STYLES
const headerStyle = css`
    position: absolute; top: 0; left: 0; right: 0;
    height: 50px;
    background: rgba(30, 30, 30, 0.9);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    pointer-events: auto;
    z-index: 10;
`

const toolsStyle = css`
    position: absolute; top: 60px; left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: auto;

    button {
        width: 40px; height: 40px;
        background: #333;
        border: 1px solid #555;
        border-radius: 8px;
        cursor: pointer;
        font-size: 20px;
        color: white;
        &:hover { background: #444; }
    }
`

const panelStyle = css`
    position: absolute; top: 60px; right: 20px;
    width: 250px;
    background: rgba(30, 30, 30, 0.9);
    color: white;
    padding: 15px;
    border-radius: 8px;
    pointer-events: auto;
`
