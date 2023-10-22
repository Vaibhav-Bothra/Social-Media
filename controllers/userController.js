const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id).then((user) => {
    return res.render("profile", {
      profile_user: user,
    });
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.user.id, req.body).then((user) => {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports.user = function (req, res) {
  return res.send("<h1>User</h1>");
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in");
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up");
};

module.exports.signOut = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error in logging out of the page:", err);
      return res.redirect("back");
    }
    req.flash("success", "You have logged out successfully!");
    return res.redirect("/users/signin");
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      }).then((user) => {
        console.log(user);
        return res.redirect("/users/signin");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully!!");
  return res.redirect("/");
};
