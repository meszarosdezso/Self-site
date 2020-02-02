const mongoose = require("mongoose")

const VoteSchema = mongoose.Schema({
  ip: {
    type: String,
    required: true
  },
  vote: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model("Vote", VoteSchema)
