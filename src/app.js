const express = require("express")
const morgan = require("morgan")
const { default: helmet } = require("helmet")
const compression = require("compression")

const app = express()
console.log("Process::", process.env)
// init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

// init db
require("./dbs/init.mongodb")
const { checkOverLoad } = require("./helpers/check.connect")
checkOverLoad()

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Database connection established",
  })
})

module.exports = app
