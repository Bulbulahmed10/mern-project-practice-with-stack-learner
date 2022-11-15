require('dotenv').config()
const mongoose = require('mongoose')

MongoDB_URL =  process.env.MONGO_URL

mongoose.connect(MongoDB_URL)
.then(() => {
    console.log('MongoDB Database Connected');
})
.catch((err) => {
    console.log(`Mongodb disconnected`, err.message);
})

