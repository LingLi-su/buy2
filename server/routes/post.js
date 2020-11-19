const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");
const multer = require("multer");
const { User } = require("../models/User");
const { Subscriber }= require("../models/Subscriber");
const { Photo }= require("../models/Photo");


const { auth } = require("../middleware/auth");

const s3 = require('../s3config/s3Multer');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Post
//=================================

router.post("/uploadImage", auth, s3.upload.single('file'), (req, res) => {
  // upload(req, res, (err) => {
  //   if (err) {
  //     return res.json({ success: false, err });
  //   }
  //   return res.json({
  //     success: true,
  //     image: res.req.file.path,
  //     fileName: res.req.file.filename,
  //   });
  // });
    // if (err) {
    //   return res.json({ success: false, err });
    // }
    console.log('aaaaaaaaa')
    // console.log(req.file);
    console.log(res.body);
    console.log('aaaaaaaaa')

  //   const photo = new Photo(req.body);

  // photo.save((err) => {
  //   if (err) {
  //     return res.status(400).json({ success: false, err });
  //   } 
  //   });

    return res.json({
      success: true,
      image: req.file.location,
      fileName: req.file.key,
    });
});


router.post("/getfollows", auth, (req,res) => {
  Subscriber.find({userFrom: { $in: req.user._id}}).populate("userFrom").exec((err,follows) => {
    if (err) return res.status(400).send(err);
      console.log(follows);
      res.status(200).json({ success: true, follows });
  })
})

router.post("/uploadPost", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const post = new Post(req.body);
  let postId = null;
  //   console.log("aaaaaaa");
  //   console.log(req);
  //   console.log("aaaaaaa");

  console.log("bbbbbbbb");
  console.log(req.user._id);
  console.log("bbbbbbbb");

  post.save((err) => {
    // if (err) {
    //   return res.status(400).json({ success: false, err });
    // } else {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          post: post._id,
        },
      },
      { new: true },
      (err, userInfo) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true });
      }
    );
    //   return res.status(200).json({ success: true });
  });
});


router.post("/mypost", auth, (req, res) => {
  console.log('hiiiiiiiiii')

  console.log(req.body);
  Post.find({ writer: { $in: req.user._id } })
    .populate("writer")
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      console.log(posts);
      res.status(200).json({ success: true, posts, postSize: posts.length });
    });
});

router.post("/newsfeed", auth, (req, res) => {
  console.log('hiiiiiiiiii')

  console.log(req.body);
  Post.find({ writer: { $in: req.body.user_id } })
    .populate("writer")
    .exec((err, posts) => {
      if (err) return res.status(400).send(err);
      console.log(posts);
      res.status(200).json({ success: true, posts, postSize: posts.length });
    });
});

router.post("/getPosts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs);

  if (term) {
    Post.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, posts) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, posts, postSize: posts.length });
      });
  } else {
    Post.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, posts) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, posts, postSize: posts.length });
      });
  }
});

router.get("/posts_by_id", (req, res) => {
  let type = req.query.type;
  let postIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    postIds = [];
    postIds = ids.map((item) => {
      return item;
    });
  }

  //we need to find the post information that belong to post Id
  Post.find({ _id: { $in: postIds } })
    .populate("writer")
    .exec((err, post) => {
      if (err) return req.status(400).send(err);
      return res.status(200).send(post);
    });
});

router.post("/likedlist", (req, res) => {
  console.log("yoooooooooo")
  console.log(req.body.postId);
  console.log("yoooooooooo")

  Post.findOne({ _id: req.body.postId }, (err, post) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
      postInfo: post,
    });
  });
})

module.exports = router;
