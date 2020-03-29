import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://self-site-o00nxzajh.now.sh/"
    : "http://localhost:8000"

ReactDOM.render(<App />, document.getElementById("root"))

serviceWorker.unregister()
