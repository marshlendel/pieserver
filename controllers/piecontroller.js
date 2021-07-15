// const Express = require("express")
// const router = Express.Router()

//Pulls the router out of the express module and puts it in a variable

const router = require("express").Router()
const {PieModel} = require("../models")

// router.get("/", (req, res) => {
//     res.send("Main route hit!")
// })

router.get("/", async(req, res) => {
    try {
        const allPies = await PieModel.findAll();
        res.status(200).json(allPies)
    } catch(err) {
        res.status(500).json({
            error: err,
        })
   }
})

router.post("/", async (req, res) => {
     const {
         nameOfPie,
         baseOfPie,
         crust,
         timeToBake,
         servings,
         rating
     } = req.body

     try {
         const Pie = await PieModel.create({
            nameOfPie,
            baseOfPie,
            crust,
            timeToBake,
            servings,
            rating
         })
         res.status(201).json({
             message: "Pie successfully created",
             Pie, 
         })
     } catch(err) {
         res.send(500).json({
             message: `Failed to create pie: ${err}`
         })
     }
})

module.exports = router