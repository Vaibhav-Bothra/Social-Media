const { response, request } = require("express");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        console.log(post);
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post created"
            })
        }
        req.flash('success','Post published!')
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id)
            // req.user.id gets the id in string form and req.user._id gets the id in ObjectId type.
        if(post.user == req.user.id){
            Post.findByIdAndDelete(post._id).then((post)=>{
                    // console.log(post);
            });
            let comment = await Comment.deleteMany({post:post._id});
            req.flash('success','Post and associated comments are deleted successfully!');
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    }catch(err){
        return res.redirect('back');
    }
}