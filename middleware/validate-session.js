//!Checks to see if you have a valid token, if not,  otherwise it yells at you saying you're not authorized

                    //Like a ticket to do certain actions on a server
const jwt = require("jsonwebtoken")
const {UserModel} = require("../models/")

const ValidateSession = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    } else if (req.headers.authorization) { //Otherwise in request headers in authorization (our token) go ahead and verify and decode our token
        const {authorization} = req.headers
        const payload = authorization ? jwt.verify(authorization, "secret-key") : undefined 

        if(payload) {  //If it comes back as true matchup with user in our database
            let foundUser = await UserModel.findOne({
                where: {
                    id: payload.id
                }
            })
            if(foundUser) {
                req.user = foundUser
                next() //We got and decoded a token and they're authorized then this comes back as true and we break outta this
            } else {
                res.status(400).send({
                    message: "Not authorized"

                })
            }
        } else {
            res.status(401).send({
                message: "Invalid token"
            })
        }
    } else {
        res.status(403).send({
            message: "Forbidden"
        })
    }
}

module.exports = ValidateSession