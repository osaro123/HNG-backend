const express = require("express")
const getLocationAndWeatherController = require("../controllers/controller")
const router = express.Router()

router.get("/api/hello", getLocationAndWeatherController)

module.exports = router