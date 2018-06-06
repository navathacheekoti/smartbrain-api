const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "lallu17489",
        database: "smart-brain"
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(database.users);
});

app.post("/signin", (req,res)=>{signin.handleSignin(req, res,db,bcrypt)});

app.post("/register", (req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get("/profile/:id",(req,res)=>{profile.profileHandler(req,res)} );

app.put("/image", (req,res)=>{image.imageHandler(req,res,db)});

app.post("/imageUrl", (req,res)=>{image.handleApicall(req,res)});

app.listen(process.env.PORT||3000, () => {
    console.log(`app running in ${process.env.PORT}`);
});

