import './db.mjs';
import mongoose from 'mongoose';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as fs from 'fs';
import multer from 'multer';
import bodyParser from 'body-parser';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname)
    }
})

const upload = multer({ dest: 'uploads/'})
app.use(upload.array('images'));

// if mongoose is connected, set
const User = mongoose.model('User');
const ShoppingCart = mongoose.model('ShoppingCart');
const Item = mongoose.model('Item');

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/user', (req, res) => {
    const { email, password } = req.query;
    // get user with req.body
    // const { email, password } = req.body;
    console.log("email is: ", email)
    console.log("password is: ", password)
    // find user with email and password
    User.findOne({ email_address: email, password: password }).then((user) => {
        // if user is found, return user
        if (user) {
            console.log("found user is: ", user)
            res.json(user);
        } else {
            // if user is not found, return null
            res.json(null);
        }
    });
});

app.post('/user', async (req, res) => {
    console.log("user is: ", req.body)
    const user = new User({...req.body, email_address: req.body.email});
    console.log("mongoose user is: ", user)
    await user.save()
        .then((savedUser) => {
            console.log("user is: ", savedUser);
            res.json(savedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'User creation failed' });
        });
});

app.post('/updateprofile', async (req, res) => {
    // this holds an array where the first element is the object of the initial user
    // and the second element is the object of the updated user
    const { initialUser, updatedUser } = req.body;
    console.log("initial user is: ", initialUser)
    console.log("updated user is: ", updatedUser)
    // find user with email and password
    User.findOneAndUpdate(
        { email_address: initialUser.email_address, password: initialUser.password }, 
        updatedUser,
        { new: true }
    )
        .then(async (user) => {
            // if user is updated, return it, and if it isnt, return null
            if (user) {
                await user.save()
                    .then((savedUser) => {
                        console.log("updated user is: ", savedUser)
                        res.json(savedUser);
                    })
            } else {
                res.json(null);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'User update failed' });
        });
});
// 
app.post("/createitem", upload.array('images'), async (req, res) => {
    const formData = req.body;
    console.log("formData is: ", formData)
    // frontend can do formData.get('images') to get the array of images
    // const data = JSON.parse(formData.data);
    // console.log("parsed data is: ", data)
    // frontend passes JSON.stringify(name, price, description, newused, formData, username: user.username) as body
    // const { name, price, description, newused, username, formData } = req.body;
    // const data = req.body.data;
    // console.log("data is: ", data)
    // const { name, price, description, newused, username } = data;

    // formData holds new FormData() with formData.append('images', finalfiles[i]);
    // console.log("name is: ", name)
    // console.log("price is: ", price)
    // console.log("description is: ", description)
    // console.log("newused is: ", newused)
    // console.log("username is: ", username)
    // console.log("formData is: ", formData)

    
    // find user with username
    // User.findOne({ username: username }).then(async (user) => {
    //     if (user) {
            // save item here

    //     }
    // })
});

app.listen(process.env.PORT || 3001);