import { AppPropsType } from "next/dist/next-server/lib/utils"
import ThemeProvider, { ThemeContext } from "../providers/theme.provider"
import ScrollProvider from "../providers/scroll.provider"
import "./_app.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"

export default function App({ Component, pageProps }: AppPropsType) {
  return (
    <ScrollProvider>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <div
              style={{
                color: theme.textColor,
              }}
              className={`App ${theme.isDark ? "dark" : "light"}`}
            >
              <Component {...pageProps} />
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </ScrollProvider>
  )
}
