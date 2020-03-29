const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")

if (process.env.NODE_ENV !== "production") require("dotenv").config()

const origin =
  process.env.NODE_ENV === "production"
    ? "https://self-site-o00nxzajh.now.sh/"
    : "http://localhost:3000"

const app = express()

app.use(cors({ origin }))
app.use(express.json())
app.use("/api", require("./routes/api/me.route"))

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => console.log("\x1b[33m%s\x1b[0m", "Database connection established")
)

if (process.env.NODE_ENV === "production") {
  console.log("I'm in production")

  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
