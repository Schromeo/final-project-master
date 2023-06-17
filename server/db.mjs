// will hold the schema for the database

import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
import fs from 'fs';
import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// create a User Schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: false},
    email_address: {type: String, required: true},
    // role will either be seller or buyer
    role: {type: String, required: true},
    // link to a shopping cart
    shopping_cart: {type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingCart'},
    listed_items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
    interests: [{type: String, required: false}],
});

const ShoppingCartSchema = new mongoose.Schema({

})

const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {
        data: Buffer,
        contentType: String
    },
    // reference to the seller
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    // reference to shopping cart
    shopping_cart: {type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingCart'}
});

// link the slug plugin to the ItemSchema
ItemSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

mongoose.model('User', UserSchema);
mongoose.model('Item', ItemSchema);
mongoose.model('ShoppingCart', ShoppingCartSchema);

let dbconf = 'mongodb://localhost/commerce';
mongoose.connect(dbconf);
