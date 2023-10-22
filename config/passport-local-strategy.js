const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      //this is a callback function and done is also a function which is called after this callback.
      // find user and establish identity
      User.findOne({ email: email }).then((user) => {
        // if(err){
        //     console.log("Error in finding user --> Passport");
        //     return done(err);
        // }
        if (!user || user.password != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false); //first argument is that error is null and second argument is that authentication is false.
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    // if(err){
    //     console.log("Error in finding user --> Passport");
    //     return done(err);
    // }
    return done(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/signin");
};

passport.alreadyAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
