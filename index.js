const express = require("express")
const cors = require("cors")
const axios = require("axios")
const path = require("path")

const origin =
  process.env.NODE_ENV === "production"
    ? "https://meszarosdezso.herokuapp.com"
    : "http://localhost:3000"

const app = express()

app.use(cors({ origin }))

app.get("/api", (req, res) => {
  const user = req.query["user"] || "meszarosdezso"

  axios
    .get(`https://api.github.com/users/${user}`)
    .then(response => res.json(response.data))
    .then(res.json)
})

app.get("/api/repos", (req, res) => {
  const user = req.query["user"] || "meszarosdezso"

  axios
    .get(`https://api.github.com/users/${user}/repos`)
    .then(response => res.json(response.data))
    .then(res.json)
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "cliend", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
