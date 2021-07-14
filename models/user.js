//!File for the ORM that uses Sequelize to create the columns in the Postgres Table
const db = require("../db")
const {DataTypes} = require("sequelize")

const User = db.define("user", {
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false, //Validation and constraint empty entry
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User