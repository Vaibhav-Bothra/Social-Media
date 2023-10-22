const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post).then((post) => {
    if (post) {
      Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      }).then((comment) => {
        post.comments.push(comment);
        post.save();
        return res.redirect("back");
      });
    }
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id).then((comment) => {
    // req.user.id gets the id in string form and req.user._id gets the id in ObjectId type.
    if (comment.user == req.user.id) {
      let postId = comment.post;
      Comment.findByIdAndDelete(req.params.id).then((comment) => {
        // console.log(comment);
      });
      Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      }).then((comment) => {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
