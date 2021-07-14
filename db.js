const Sequelize = require("sequelize")
//Imports the sequelize dependency into the variable

const sequelize = new Sequelize("postgres://postgres:005d4a65e07d4f1b8c5387e095c3591d@localhost:5432/pieserver")
//dbType://user:password@ipAddress:port/dbName

module.exports = sequelize