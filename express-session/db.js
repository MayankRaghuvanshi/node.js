const sequelize = require('sequelize')
const db = new sequelize('login','root','singh7272',{
        host: "localhost",
        dialect: "mysql",
        pool:{
            min:0,
            max:10
        }
    }
)

const user =db.define('users',{
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:true
    },
    email:{
        type: sequelize.STRING,
        //primaryKey:true,
        //allowNull:false
    },
    password:{
        type:sequelize.INTEGER,
        allowNull:false,

    }
})


//make sure all the tables are existing in our database we use a promis
db.sync().then(()=>console.log("db has been created")).catch((err)=>console.error(err))

exports = module.exports =
    {
        user

    }