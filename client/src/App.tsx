import React from "react"
import "./App.scss"
import ThemeProvider, { ThemeContext } from "./Providers/theme_provider"
import Home from "./Pages/Home/Home"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <div
            className='App'
            style={{
              background: theme.primaryColorDark,
              color: theme.textColor
            }}
          >
            <Home />
            <div>
              <h1>hey</h1>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  )
}

export default App
