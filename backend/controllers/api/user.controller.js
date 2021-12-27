const users = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    let userData = new users({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashPassword,
        created: Date.now(),
    });

    userData.save((err, result) => {
        if(err){
            res.status(404).json({
                status: false,
                message: 'Error adding data.'
            })
        }
        else{
            res.status(200).json({
                status: true,
                message: "Registration successfull.",
                result: result
            })
        }
    })
}

exports.login = (req, res, next) => {
    let { email, password } = req.body;

    users.findOne({email: email}, (err, result) => {
        if(err){
            res.status(404).json({
                status: false,
                message: 'Error retrieving data.'
            })
        }
        else if(!result){
            res.status(404).json({
                status: false,
                message: 'User not found.'
            })
        }
        else {
            bcrypt.compare(password, result.password, (err2, data) => {
                if(!data){
                    res.status(404).json({
                        status: false,
                        message: 'Email and Password are mismatched.'
                    })
                }
                else{
                    let userObj = {
                        id: result._id, 
                        fname: result.fname, 
                        lname: result.lname,
                        email: result.email 
                    }
                    jwt.sign(
                        {user:userObj}, 
                        process.env.JWT_KEY,
                        {
                          expiresIn: "24h",
                        },
                        (err, token) => {
                            if(err){
                                res.status(404).json({
                                    status: false,
                                    message: 'Error generating token.'
                                })
                            }
                            else {
                                res.status(200).json({
                                    status: true,
                                    message: "Login successfull.",
                                    token: token
                                })
                            }
                        });
                }
            })
        }
    })
}

