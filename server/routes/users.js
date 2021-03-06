const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { auth } = require("../middleware/auth");
const { Payment } = require("../models/Payment");

const async = require("async");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });
    if (req.body.oauth) {
      console.log(req.body.password);
      console.log(user.password);
      if (req.body.password == user.password) {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_authExp", user.tokenExp);
          res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      } else {
        return res.json({ loginSuccess: false, message: "Wrong password" });
      }
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "Wrong password" });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_authExp", user.tokenExp);
          res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      });
    }
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
  res.cookie("connect.sid", "");
  res.cookie("w_authExp", "");
  res.cookie("w_auth", "").status(200);
});

router.post("/userInfo", (req, res) => {
  console.log("mmmmmmm");
  console.log(req.body);
  console.log("mmmmmmm");

  User.findOne({ _id: req.body.userId }, (err, user) => {
    if (err) return res.json({ success: false, err });
    console.log("userrrrr");
    console.log(user);
    console.log("userrrrr");

    return res.status(200).send({
      success: true,
      userInfo: user,
    });
  });
});

router.get("/user_by_id", (req, res) => {
  let userId = req.query.id;
  User.find({ _id: { $in: userId } })
    .populate("_id")
    .exec((err, user) => {
      // if (err) return req.status(400).send(err);
      // return res.status(200).send(user);

      Post.find({ writer: { $in: userId } })
        .populate("writer")
        .exec((err, posts) => {
          if (err) return res.status(400).send(err);
          console.log(posts);
          res
            .status(200)
            .json({ success: true, posts, postSize: posts.length, user });
        });
    });
});

router.get("/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;

    console.log(userInfo);

    userInfo.cart.forEach((item) => {
      if (item.id == req.query.postId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.query.postId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.query.postId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    }
  });
});

router.get("/removeFromCart", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: req.query._id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Post.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

// router.get('/userCartInfo', auth, (req, res) => {
//     User.findOne(
//         { _id: req.user._id },
//         (err, userInfo) => {
//             let cart = userInfo.cart;
//             let array = cart.map(item => {
//                 return item.id
//             })

//             Product.find({ '_id': { $in: array } })
//                 .populate('writer')
//                 .exec((err, cartDetail) => {
//                     if (err) return res.status(400).send(err);
//                     return res.status(200).json({ success: true, cartDetail, cart })
//                 })

//         }
//     )
// })

router.post("/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  //1.Put brief Payment Information inside User Collection
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  //2.Put Payment Information that come from Paypal into Payment Collection
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.post = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. Increase the amount of number for the sold information

        //first We need to know how many post were sold in this transaction for
        // each of post

        let posts = [];
        doc.post.forEach((item) => {
          posts.push({ id: item.id, quantity: item.quantity });
        });

        // first Item    quantity 2
        // second Item  quantity 3

        async.eachSeries(
          posts,
          (item, callback) => {
            Post.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

router.get("/getHistory", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let history = doc.history;
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, history });
  });
});

router.get("/getLiked", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let liked = doc.liked;
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, liked });
  });
});

module.exports = router;
