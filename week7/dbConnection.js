const mongoose = require('mongoose')
const dbConnection = async() => {
try{
    await mongoose.connect('mongodb+srv://vaibhavsingh4141:F4gRJscqssLDeHXG@cluster0.fu41j.mongodb.net/')
    console.log("DB Connected")
    }catch(e){
    throw new Error(e.message)
    }
}

module.exports = dbConnection; 