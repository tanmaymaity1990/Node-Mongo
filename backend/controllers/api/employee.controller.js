const employees = require('../../models/employee.model');

exports.manage = (req, res, next) => {
    employees.find((err, result) => {
        if(err){
            res.status(404).json({
                status: false,
                message: 'Error retrieving data.'
            })
        }
        else{
            res.status(200).json({
                status: true,
                result: result
            })
        }
    })
}

exports.insert = (req, res, next) => {
    let employeeData = new employees(req.body);
    employeeData.save((err, result) => {
        if(err){
            res.status(404).json({
                status: false,
                message: 'Error adding data.'
            })
        }
        else{
            res.status(200).json({
                status: true,
                message: "Record added successfully.",
                result: result
            })
        }
    })
}

exports.update = (req, res, next) => {
    let id = req.params.id;
    let employeeData = req.body;

    employees.findById(id, (err, result) => {
        if(err){
            res.status(404).json({
                status: false,
                message: "Something went wrong."
            })
        }
        else{
            if(!result){
                res.status(404).json({
                    status: false,
                    message: "Error retrieving data."
                })
            }
            else{
                employees.findByIdAndUpdate(id, employeeData, (err2, result2) => {
                    if(err2){
                        res.status(404).json({
                            status: false,
                            message: 'Error updating data.'
                        })
                    }
                    else{
                        res.status(200).json({
                            status: true,
                            message: "Record Updated Successfully.",
                            result: result2
                        })
                    }
                })
            }
        } 
    })
}

exports.view = (req, res, next) => {
    let id = req.params.id;
    employees.findById(id, (err, result) => {
        if(err){
            res.status(404).json({
                status: false,
                message: 'Something went wrong.'
            })
        }
        else{
            if(!result){
                res.status(404).json({
                    status: false,
                    message: 'Error retrieving data.'
                })
            }
            else{
                res.status(200).json({
                    status: true,
                    result: result
                })
            }
        }
    })
}

exports.delete = (req, res, next) => {
    let id = req.params.id;

    employees.findById(id, (err, result) => {
        if(err){
            res.status(404).json({
                status: false,
                message: "Something went wrong."
            })
        }
        else{
            if(!result){
                res.status(404).json({
                    status: false,
                    message: "Error retrieving data."
                })
            }
            else{
                employees.deleteOne({_id:id}, (err2, result2) => {
                    if(err2){
                        res.status(404).json({
                            status: false,
                            message: "Error deleting data."
                        })
                    }
                    else{
                        res.status(200).json({
                            status: true,
                            message: "Record deleted successfully.",
                            result: result2
                        })
                    }
                })
            }
        } 
    })
}

