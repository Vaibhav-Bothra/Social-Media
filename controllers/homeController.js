const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // const posts = await Post.find({}).populate('user');
  // return res.render('home',{
  //     posts: posts
  // })
  Post.find({})
    .populate("user")
    .sort("-createdAt")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      User.find({}).then((user) => {
        return res.render("home", {
          posts: posts,
          all_users: user,
        });
      });
    });
};
