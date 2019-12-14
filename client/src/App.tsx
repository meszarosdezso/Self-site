import React from "react"
import "./App.scss"
import ThemeProvider from "./Providers/theme_provider"
import Home from "./Pages/Home/Home"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className='App'>
        <Home />
      </div>
    </ThemeProvider>
  )
}

export default App
