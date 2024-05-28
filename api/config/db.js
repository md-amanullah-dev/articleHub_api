const mysql = require("mysql");


const connectDB = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"articleHub"
});

connectDB.connect((err)=>{

    if(err){
        console.log("Something went wrong!")
    }else{
        console.log("DB connect successfully!")
        
    }
})


module.exports = connectDB;