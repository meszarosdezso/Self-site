const express = require("express")
const cors = require("cors")
const axios = require("axios")
const path = require("path")

require("dotenv").config()

const origin =
  process.env.NODE_ENV === "production"
    ? "https://meszarosdezso.herokuapp.com"
    : "http://localhost:3000"

const app = express()

app.use(cors({ origin }))

app.get("/api", (req, res) => {
  const user = req.query["user"] || "meszarosdezso"

  axios
    .get(
      `https://api.github.com/users/${user}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
    )
    .then(response => res.json(response.data))
    .catch(err =>
      res.status(500).send({ message: "Something bad happened...", err })
    )
})

app.get("/api/repos", (req, res) => {
  const user = req.query["user"] || "meszarosdezso"

  axios
    .get(
      `https://api.github.com/users/${user}/repos?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
    )
    .then(response => res.json(response.data))
    .catch(err =>
      res.status(500).send({ message: "Something bad happened...", err })
    )
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "cliend", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
