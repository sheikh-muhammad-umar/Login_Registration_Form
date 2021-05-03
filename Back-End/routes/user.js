const express = require("express");
const route = express();
const jwt = require("jsonwebtoken");
const {
    authorized
} = require("../middlewear/authorize");
const config = require("../config");
const User = require("../database/models/user");

route.get("/", (req, res) => {
    res.send("User Route...");
});

route.post("/register", (req, res, next) => {
    const newUser = new User({
        name: req.body.info.name,
        email: req.body.info.email,
        username: req.body.info.userName,
        password: req.body.password,
        phone: req.body.info.phone,
        course: req.body.course,
        gender: req.body.gender,
        skills: [...req.body.skills],
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: err,
            });
        } else {
            res.json({
                success: true,
                msg: "User registered.",
            });
        }
    });
});

route.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json({
                success: false,
                msg: "User not found.",
            });
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                } else if (isMatch) {
                    const token = jwt.sign({
                            username: user.username,
                        },
                        config.SECRET_KEY, {
                            expiresIn: 604800,
                        }
                    );
                    res.json({
                        success: true,
                        msg: "Pawssword matched",
                        user: {
                            name: user.name,
                            email: user.email,
                        },
                        token: token,
                    });
                } else {
                    res.json({
                        success: true,
                        msg: "Pawssword not matched",
                    });
                }
            });
        }
    });
});

route.get("/profile", authorized, (req, res) => {
    res.send(req.user);
});

module.exports = route;