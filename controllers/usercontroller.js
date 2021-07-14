const router = require("express").Router()
const {UserModel} = require("../models")
const {UniqueContsraintError} = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken") //Deals with the stateless nature of HTTP

//POST is used to create and pass data from a body and thi sis an async funciton cause ,authenticate() returns a promise
  router.post("/register", async (req, res) => {
        /*
        !Way to add data without  object destructuring
        email: req.body.user.email,
        password: req.body.user.password
        */
     let {firstName, lastName, email, password} = req.body.user  //Passes the data from the user in the body to the destructured email and password
     try {
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password //Can just pass these in here because we destructured them from the body.user of the POST request
        })

                            //payload, the secret or private key, and the expires
        let token = jwt.sign({id: User.id, email: User.email},
            "secret-key", {expiresIn: 60 * 60 * 24})

        res.status(201).json({
            message: "User registered successfully",
            user: User,
            sessionToken: token
        })

     } catch(err) {
        if(err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already exists"
            })
        }
        res.status(500).json({
            message: `Failed to register user ${err}`
        })
     }
    
 })

 router.post("/login", async (req, res) => {
     const {email, password} = req.body.user
     try {
         let loginUser = await UserModel.findOne({
             where: { //Have to use where with fondOne
                 email: email
             }
         })
         if(loginUser){
            res.status(200).json({
                user: loginUser,
                message: "User logged in"
            })
         }else {
             res.status(401).json({
                 message: "User not authorized"
             })
         }
       
     } catch (err) {
         res.status(500).json({
             message: "Failed to login"
         })
     }
 })

 module.exports = router