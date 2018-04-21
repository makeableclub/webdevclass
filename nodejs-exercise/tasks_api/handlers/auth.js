const db = require("../models");
const jwt = require("jsonwebtoken");
// check https://jwt.io
// secret in .env

exports.signin = async function(req, res, next){
  try {
    let user = await db.User.findOne({
        email: req.body.email
    });

    console.log(user);
    console.log(req.body.password);

    let { id, username, profileImageUrl } = user;
    let matched = await user.comparePassword(req.body.password);

    console.log( "matched? " + matched );

    if( matched ) {
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    }
    else {
        return next({
            status: 400,
            message: "Invalid email/password"
        });
    }
  }
  catch(err) {
      return next({
          status: 400,
          message: "Failed to login"
      });
  }
};

exports.signup = async function(req, res, next){
    try {
        // create user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl } = user;

        // create token
        let token = jwt.sign(
            {
                id: id,
                username: username,
                profileImageUrl: profileImageUrl
            },
            process.env.SECRET_KEY
        );

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    }
    catch(err) {
        // validation fail
        if( err.code === 11000 ) {
            err.message = "username and/or email is taken";
        }
        return next ({
            status: 400,
            message: err.message
        });
    }
};
