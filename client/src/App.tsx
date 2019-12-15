import React from "react"
import "./App.scss"
import ThemeProvider, { ThemeContext } from "./Providers/theme_provider"
import Home from "./Pages/Home/Home"
import WhoDis from "./Components/WhoDis/WhoDis"
import ProfileProvider from "./Providers/profile_provider"
import Repos from "./Components/Repos/Repos"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProfileProvider>
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
              <WhoDis />
              <Repos />
            </div>
          )}
        </ThemeContext.Consumer>
      </ProfileProvider>
    </ThemeProvider>
  )
}

export default App
