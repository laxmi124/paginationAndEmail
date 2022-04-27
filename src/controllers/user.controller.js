// const express = require("express");
// const router = express.Router();
// const User = require("../models/user.model");
// const { body, validationResult } = require("express-validator");
// const path  = require('path');
// const {upload} = require("../utils");

// router.get("/", async (req, res) => {
//   /* 
//         page : 1 , pageSize : 20 
//         ans : 0-19
//         skip : (page-1) * pageSize, limit : 20
//     */

//   const { page = 1, pageSize = 4 } = req.query;
//   let offset = (page - 1) * pageSize;
//   const users = await User.find().skip(offset).limit(pageSize);
//   let totalPages = Math.ceil((await User.find().countDocuments()) / pageSize);
//   res.status(200).json({ data: users, totalPages });
// });

// router.post(
//   "/",
//   // body("first_name")
//   //   .isLength({ min: 3, max: 15 })
//   //   .withMessage("first name is required , please fill the field"),
//   // body("last_name")
//   //   .isLength({ min: 3, max: 17 })
//   //   .withMessage("last name is required , please fill the field"),
//   // body("age")
//   //   .isFloat({ min: 1, max: 120 })
//   //   .withMessage("age is required , please fill the field with valid age"),
//   // body("email")
//   //   .isEmail()
//   //   .withMessage("email is required , please fill the field"),
//     upload.array("avatar"),
//   async (req, res) => {
//     // console.log(req.body);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       const currentCount = await User.find().countDocuments();
//       const createUser = await User.create({
//         ...req.body,
//         id: currentCount + 1,
//         avatar : req.files.map((f)=>f.path),
//       });
//       res.status(200).json(createUser);
//     } catch (err) {
//       res.status(400).send(err.message);
//     }
//   }
// );

// module.exports = router;


















//  email sender

















const express = require("express");
const User = require("../models/user.model");
const  transporter  = require("../configs/mail");

const router = express.Router();

router.get("/", async (req, res) => {

  const { page = 1, pageSize = 4 } = req.query;
  let offset = (page - 1) * pageSize;
  const users = await User.find().skip(offset).limit(pageSize);
  let totalPages = Math.ceil((await User.find().countDocuments()) / pageSize);
  res.status(200).json({ data: users, totalPages });

});

router.post("/",async (req, res) => {
    try {
      const currentCount = await User.find().countDocuments();
      const createUser = await User.create({
        ...req.body,
        id: currentCount + 1,
      });

      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: createUser.email, // list of receivers
        subject: "Welcome to ABC system ✔", // Subject line
        text: `${createUser.first_name} Please confirm your email address`, // plain text body
        html: "<b>1. Hello world?</b>", // html body
        // attachments: [
        //   {
        //     filename : "attachment 1",
        //     path : `${__dirname}/../../package.json`,
        //   }
        // ], 
        // alternatives : [
        //   {
        //     contentType : 'text/html',
        //     path : `${__dirname}/template.html`
        //   }
        // ]
      });

      res.status(200).send('regestration email send');
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = router;
