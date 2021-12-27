const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let users = new Schema(
    {
        fname: {
            type: String
        },
        lname: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        status: {
            type: Number,
            enum: [0, 1],
            default: 1
        },
        created: {
            type: Date,
            default: Date.now()
        },
        modified: {
            type: Date
        }
    }
);

const userSchema = mongoose.model("user", users);

module.exports = userSchema;