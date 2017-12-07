/*jshint esversion: 6 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: [true, 'First name is required'], 
        minlength: [2, 'First name must be at least 2 characters']
    }, 
    last_name: { 
        type: String, 
        required: [true, 'Last name is required'], 
        minlength: [4, 'Last name must be at least 4 characters']
    }, 
    email: {
        type: String, 
        required: [true, 'Email is required'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,10})?$/, 'Email is not a valid format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 4 characters'],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z]){8,32}/.test(value);
            },
            message: "Password must be at least 8 characters with uppercase"
        },
    },
    
}, {timestamps: true });

mongoose.model('User', UserSchema);