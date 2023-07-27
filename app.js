require('dotenv').config();//baca dotenv

const express = require('express');

const mongoose = require('mongoose');
const videoRoutes = require('./routes/videoRoute');
const productRoutes = require('./routes/productRoute');
const commentRoutes = require('./routes/commentRoute');

const DB_URL = process.env.DATABASE_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("error", (err) =>{
    console.log(err);
});

db.once("connected", () =>{
    console.log("DB CONNECTED");
});


const app = express();
const port = 3000;

app.use(express.json()); //buat parse body JSON di request http
app.use("/videos", videoRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);

app.listen(3000,()=>{
    console.log(`server running in port: ${port}`);
});