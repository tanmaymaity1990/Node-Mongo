const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let employees = new Schema(
    {
        empId: {
            type: String
        },
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        salary: {
            type: Number
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
    },
    {collection:"employees"}
);

const employeeSchema = mongoose.model("employees", employees);

module.exports = employeeSchema;