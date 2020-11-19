const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { Photo } = require("../models/Photo");
const { Tag } = require("../models/Tag");




router.post("/uploadPhoto", (req, res) => {

    console.log('bodyyyyyyyyy')
    console.log(req.body);
    console.log('bodyyyyyyyyy')

    const photo = new Photo(req.body);

  photo.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    } else {
      return res.status(200).json({ success: true, photoId: photo._id });
    }
    });

});


router.post("/uploadTag", (req, res) => {

    const tag = new Tag(req.body);

  tag.save((err) => {
    
    Photo.findOneAndUpdate(
        { _id: req.body.photoId },
        {
          $push: {
            tags: tag._id,
          },
        },
        { new: true },
        (err, tagInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ success: true });
        }
      );

    });


})


router.post("/getAllTag", (req, res) => {

    console.log('heeeeeeeeee')
    console.log(req.body);
    console.log('heeeeeeeeee')

    Tag.find({ photoId: { $in: req.body.photoId } })
    // .populate("photoId")
    .exec((err, tags) => {
      if (err) return res.status(400).send(err);
      console.log(tags);
      res.status(200).json({ success: true, tags});
    });

})



module.exports = router;