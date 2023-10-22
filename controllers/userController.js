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
