const router = require("express").Router()
const axios = require("axios")

router.get("/me", (req, res) => {
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

router.get("/repos", (req, res) => {
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

module.exports = router
