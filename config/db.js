require('dotenv').config();
const mongoose=require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    }catch(error){
        console.error('Error connecting mongodb',error);
        process.exit(1);
    }
}

module.exports=connectDB;