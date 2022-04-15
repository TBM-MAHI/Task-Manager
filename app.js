const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/conect.js'); 
require('dotenv').config()

const app = express();
//middleware
app.use(express.static('view'))
app.use(express.json());
//routes

app.use('/tasks', tasks); //Mounting the middleware functions (path, MW func)
                        // the path is the default route replacing "/"

const port = 3000;
async function start() {
try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("listerning on port 3000"));
    
    console.log('Task Manager App');
} catch (error) {
     console.log(error);
    }
}
//comment jhjurh
start();
