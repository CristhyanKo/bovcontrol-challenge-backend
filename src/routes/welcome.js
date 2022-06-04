const express = require('express')

const routes = express.Router()

routes.get("/", (req, res) => {
  res.json({
    message: "Welcome!"
  })
})

module.exports = routes