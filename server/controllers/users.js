var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); 
var User = mongoose.model('User');

module.exports = {
    create: function(req, res){
        hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

        if (req.body.password != req.body.confirm){
            req.session.errors = {'confirm': {'message': 'Passwords do not match'}};
            res.redirect('/');
        } else {
            var user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash,
            });
            user.save(function(err){
                if(err){
                    req.session.errors = user.errors;
                    res.redirect('/');
                }
                else {
                    req.session.user = user;
                    req.session.message = 'registered';
                    res.redirect('/dashboard');
                }
            });
        }
    },

    login: function(req, res){
        console.log('in login function');
        User.findOne({email: req.body.email}, function(err, user){
            console.log('Found USER: ' + user);
            if(!user){
                req.session.errors = {'login_email': {'message': 'Not a registered user.'}};
                res.redirect('/');
            } else if (err){
                res.redirect('/');
            } else {
                if(bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.user = user;
                    req.session.message = 'logged in';
                    res.redirect('/dashboard');
                } else {
                    req.session.errors = {'login_password': {'message': 'Incorrect password.'}};
                    res.redirect('/');
                }
            }
        });
    },
};