// const Express = require("express")
// const router = Express.Router()

//Pulls the router out of the express module and puts it in a variable
const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Main route hit!")
})

module.exports = router