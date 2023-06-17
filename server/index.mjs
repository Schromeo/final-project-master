import './db.mjs';
import mongoose from 'mongoose';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as fs from 'fs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'build')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

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

app.listen(process.env.PORT || 3001);