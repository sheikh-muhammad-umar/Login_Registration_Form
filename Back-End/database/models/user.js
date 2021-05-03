const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
});

const user = mongoose.model("user", UserSchema);
module.exports = user;

module.exports.getUserById = (id, callback) => {
    user.findById(id, callback);
};
module.exports.getUserByEmail = (email, callback) => {
    const query = {
        email: email,
    };
    user.findOne(query, callback);
};
module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            throw err;
        } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            });
        }
    });
};

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, match) => {
        if (err) {
            throw err;
        }
        callback(err, match);
    });
};