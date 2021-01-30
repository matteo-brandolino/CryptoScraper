const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Schema imported
const User = require('../models/User')

exports.register = async (req, res) => {
    const {name, email, password, password_confirmation} = req.body;
    let errors = [];
    //ERRORS
    //Check required
    if (!name || !email || !password || !password_confirmation) { //all field are required
        errors.push({msg: ' All fields are requried'});
    }

    //Password matching

    if(password !== password_confirmation) { 
        errors.push({msg : "Passwords don't match"});
    }

    //Check pass length

    if(password.length < 8) {
        errors.push({msg: 'Password too short!'})
    }

    if(errors.length>0) {
        res.send({
            errors,
            name,
            email,
            password,
            password_confirmation
        });
    }else{
        // Validation with Schema
        User.findOne({email:email}) //find a record in database with the same email
            .then(user => {
                if(user) {
                    //user already exits
                    errors.push({msg: 'Email : Email is already registered'})
                    res.send({
                        errors,
                        name,
                        email,
                        password,
                        password_confirmation
                    });
                } else {
                    const newUser = new User({ //new data
                        name,
                        email,
                        password
                    });

                    // Hash Password
                    bcrypt.genSalt(10,(err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //set pass to hash
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                        // Token
                                        const token = jwt.sign({id: user}, process.env.JWT_SECRET)
                                        res.send({
                                            token,
                                            user: {
                                                name,
                                                email
                                            }
                                        })
                                })
                                .catch(err => console.log(err))
                    }) )
                }
            })
    }
}

// Registration page middlewares
// Verify the reg data
exports.verifyRegister = async (req, res, next) => {
	req.sanitizeBody('name');
	req.checkBody('name', 'Name should not be empty!').notEmpty();
	req.sanitizeBody('email');
	req.checkBody('email', 'Email should not be empty').notEmpty();
	req.checkBody('email', 'You must enter a valid email to register').isEmail();
	req.checkBody('password', 'Password should not be empty').notEmpty();
	req.checkBody('password_confirmation', 'Password confirmation should not be empty').notEmpty();
	req.checkBody('password_confirmation', 'Both passwords does not match!').equals(req.body.password);

	const errors = req.validationErrors();
	if(errors) {
		console.log(errors);
		res.status(400).send(errors)
		return;
	}
	next();
}

// Check if the user already exists Will hook it up later
exports.checkUserExists = async (req, res, next) => {
	const user = await User.find({
		name: req.body.name,
	})
	const userMail= await User.find({
		email: req.body.email,
	})


	if(user.length|| userMail.length) {
		return res.status(400).send([{msg:`A user already exists with the username or email.`}]);
	}
	next();
}

exports.login = async (req, res) => {

	passport.authenticate('local', {session: false},
	 (err, user, info) => {
	  if (err) {
		return next(err);
	  }
  
	  if (!user) {
		return res.status(400).send(info);
	  }
  
	  req.logIn(user, function(err) {
		if (err) {
			console.log(err);
		  return next(err);
        }
        const token = jwt.sign({id: req.user}, process.env.JWT_SECRET)
		res.send({ user:user, token})
	  });
  
	}) (req, res);
};

exports.logout = (req, res) => {
	req.logout();
	res.send('Logout success')
}

exports.isLoggedIn = async (req, res, next) => {
	if (!req.isAuthenticated()) {
		res.send('You must be logged in!');
		return;
	}
	res.send({user: req.user})

	next();
}
