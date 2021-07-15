// const Express = require("express")
// const router = Express.Router()

//Pulls the router out of the express module and puts it in a variable

const router = require("express").Router()
const {PieModel} = require("../models")
const {ValidateSession} = require("../middleware")

// router.get("/", (req, res) => {
//     res.send("Main route hit!")
// })


//!List all Pies
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

//!Create Pie
router.post("/", ValidateSession, async (req, res) => {
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

//! findOne()
router.get("/:name", async (req, res) => {
    try {
      const locatedPie = await PieModel.findOne({
        where: {
          nameOfPie: req.params.name //Needs to match the parameter in the route
        }
      });

      res.status(200).json({
        message: "Pies successfully retrieved",
        locatedPie,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to retrieve pies: ${err}`,
      });
    }
  });

  //! update()
  router.put("/:id", async (req, res) => {
    const {
      nameOfPie,
      baseOfPie,
      crust,
      timeToBake,
      servings,
      rating,
    } = req.body;

    try {
      await PieModel.update(
        { nameOfPie, baseOfPie, crust, timeToBake, servings, rating },
        { where: { id: req.params.id }, returning: true }
      )
      .then ((result) => {
        res.status(200).json({
          message: "Pie successfully updated",
          updatedPie: result,
        });
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to update pie: ${err}`,
      });
    }
  });
  
  //! DELETE
  router.delete("/:id", async (req, res) => {
     
      try {
          await PieModel.destroy({ 
              where: { 
                  id: req.params.id 
                },
            })
          .then((result) => {
              res.status(200).json({
                  message: "Pie successfully destroyed",
                  deletedPie: result
              })
          })
      } catch(err) {
          res.status(500).json({
              message: `Failed to destroy pie: ${err}`
          })
      }
      
  })
  

module.exports = router