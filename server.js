const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
// const pg = require('pg');

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "lallu17489",
        database: "smart-brain"
    }
});
// db
//     .select("*")
//     .from("users")
//     .then(data => {
//         console.log(data);
//     });

const app = express();

app.use(bodyParser.json());
app.use(cors());
// const database = {
//     users: [
//         {
//             id: "123",
//             name: "john",
//             email: "john@gmail.com",
//             password: "cookies",
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: "124",
//             name: "andrei",
//             email: "andrei@gmail.com",
//             password: "bananas",
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id: "987",
//             has: "",
//             email: "john@gmail.com"
//         }
//     ]
// };

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

// Load hash from your password DB.
