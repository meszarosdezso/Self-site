const router = require("express").Router()

const Vote = require("../../models/Vote.model")

router.get("/", async (req, res) => {
  const trues = Vote.find({ vote: true })
  const falses = Vote.find({ vote: false })
  console.log(trues.countDocuments())
  res.send({
    trues: await trues.countDocuments(),
    falses: await falses.countDocuments()
  })
})

router.get("/:ip", async (req, res) => {
  const vote = await Vote.findOne({ ip: req.params.ip })
  if (vote) return res.send(vote.vote)
  else return res.status(404).send({ message: "Vote not found" })
})

router.post("/", async (req, res) => {
  const { ip, vote } = req.body
  const found = await Vote.findOne({ ip })
  if (found) {
    console.log("Found")
    await found.updateOne({ vote })
  } else {
    new Vote({ ip, vote }).save()
  }
  return res.json(req.body)
})

module.exports = router
