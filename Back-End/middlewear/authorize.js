const jwt = require("jsonwebtoken");
const User = require("../database/models/user.js");
const {
    SECRET_KEY
} = require("../config");

module.exports = {
    authorized(req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader;

            jwt.verify(token, SECRET_KEY, async(err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                const authUser = await User.findOne({
                    username: user.username,
                }, {
                    skills: 1,
                    course: 1,
                    name: 1,
                    gender: 1,
                });
                req.user = authUser;
                // res.send(authUser);
                next();
            });
        } else {
            res.sendStatus(401);
        }
    },
};