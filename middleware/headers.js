//!CORS Steader
/*
    This info saying what things are allowed to read inormation coming from a web browser
    Setting up rules for how to interact with the server
*/

module.exports = (req, res, next) => {
    //Response header that tells browser to allow code from any origin
    res.header("access-control-allow-origin", "*")
    //Response header that specifies what methods are allowed from client request
    res.header("access-control-allow-methods", "GET, POST, PUT, DELETE")
    //Response header that's used in response to a pre-flight request that indicates which HTTP response headers can be used
    //Pre-flight request is a cours request that checks to see if the CORS protocol is understood. Issued by the browser
    //Sending a note to the server pretty asking if it's cool to send a certain request
    res.header("access-control-allow-headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization")

    //Do the next middleware thing
    next();
}