import { RootLayout } from './components/ui/RootLayout'
import { Header, ToolIcons, ToolPanel } from './components/ui/LayoutParts'
import { Scene } from './components/scene/Scene'

function App() {
  return (
    <>
      {/* 1. The 3D Layer */}
      <Scene />

      {/* 2. The UI Overlay Layer */}
      <RootLayout>
          <Header />
          <ToolIcons />
          <ToolPanel />
      </RootLayout>
    </>
  )
}

export default App
