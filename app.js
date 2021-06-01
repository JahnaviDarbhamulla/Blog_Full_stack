//jshint esversion:6

const express =require("express");
const bodyParser =require("body-parser");
const ejs= require("ejs");
const _ = require('lodash');
const mongoose=require("mongoose");


const app =express();

app.set("view engine",'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static( "public" ) );
mongoose.connect("mongodb+srv://admin-abhinav:******************.ispu5.mongodb.net/blogDB",{useNewUrlParser: true});


const postSchema = {
  title:String,
  content:String,
image:String,
};

const Post = mongoose.model("post",postSchema);


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");


});



app.get("/blog",function(req ,res){
Post.find({},function(err,post){
  res.render("blog",{
    post:post
  });
})

});

app.get("/abs",function(req,res){
  res.render("compose");
});

app.post("/abs",function(req,res){


const newpost = new Post ({
title:req.body.postTitle,
content:req.body.post,
image:req.body.image,
});


newpost.save(function(err){

   if (!err){

     res.redirect("/blog");

   }

 });

});

app.get("/blog/:postId",function(req,res){
  const requestedPostId = req.params.postId;




    Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
        image:post.image,
        title: post.title,

        post: post

      });


});
});



app.listen( process.env.PORT || 3000 ,function(){
  console.log("server is up and running on port 3000");
});
