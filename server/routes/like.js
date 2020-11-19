const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Post } = require("../models/Post");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             Likes 
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId }
    } else {
        variable = { commentId: req.body.commentId }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})




router.post("/upLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const like = new Like(variable)
    like.save((err, likeResult) => {
        // if (err) return res.json({ success: false, err });
        // res.status(200).json({ success: true })
        User.findOneAndUpdate(
            { _id: req.body.userId },
            {
              $push: {
                liked: req.body.postId
              },
            },
            { new: true },
            (err, post) => {
              if (err) return res.json({ success: false, err });
              res.status(200).json({success: true, post});
            }
          );
    })

})




router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.postId) {
        variable = { postId: req.body.postId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            // if (err) return res.status(400).json({ success: false, err })
            // res.status(200).json({ success: true })

            User.findOneAndUpdate(
                { _id: req.body.userId },
                {
                  $pull: {
                    liked: req.body.postId
                  },
                },
                { new: true },
                (err, post) => {
                  if (err) return res.json({ success: false, err });
                  res.status(200).json({success: true, post});
                }
              );
        })

})

// router.post("/likedpost", (req, res) => {

// })







module.exports = router;