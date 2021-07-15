const Express = require("express")
//Imports Express dependency into the application 

const app = Express()
//Top level function allowing access to all of its methods

//!Imports
const dbConnection = require("./db")
const controllers = require("./controllers/")
const middlewares = require("./middleware")

dbConnection.authenticate()//returns a promise
    .then(() => dbConnection.sync()) //Syncs models/schemas to the database
    .then(() => {                    //Only fires the app once the database is authenticated and schemas are synched
        app.listen(3000, () => {
            console.log("[Server] is running on 3000")
        })
    })
    .catch(err => `[server] crashed ${err}`)

app.use(middlewares.CORS)
// app.use(middlewares.ValidateSession)
app.use(Express.json()) //Have to use this to turn the JSON from the POST request into an actual object
app.use("/pies", controllers.pieController)
app.use("/user", controllers.userController)