const router = require("express").Router();
const User = require("../models/Demo");
const auth = require("../helper/verifytoken");
const upload = require("../helper/imageUpload");
const bcrypt = require("bcrypt");

const fs = require("fs");

/*
Here is the CRUD opration

    If you want to upload multipal images then simaply use 
    first arg is image name and secound is how many image wants to upload
    upload.array("images",2)

    For update image write upload.single() or upload.array() as add data

    If you want to delete or Edit particular one data then pass /demo after /:id like /demo/:id

    You can also find user id by req.user._id  it's done by auth token
 */

// This is one kind of registration of user

// Get data form database
router.get("/demo", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.send(400).json({ error: "User not exist." });
    }
    res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
});

// Add data to dabase with single image
router.post("/demo", upload.single("image"), async (req, res) => {
  try {
    const { name, password } = req.body;
    const hashed = await bcrypt.hash(password, 8);
    const user = new User({
      name: name,
      password: hashed,
    });
    if (req.file !== undefined) {
      user.image = req.file.originalname;
    }
    const data = await user.save();
    res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
});

// Edit data
router.put("/demo/:id", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "User not exist." });
    }

    const updatedDemo = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name: name, password: password },
      },
      { new: true }
    );
    if (req.file !== undefined) {
      const basePath = "./public/images/" + user.image;
      if (fs.existsSync(basePath)) {
        fs.unlinkSync(basePath);
      }
      updatedDemo.image = req.file.originalname;
    }
    res.status(200).json({ updatedDemo });
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
});

// Delete data from database
router.delete("/demo/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted." });
    }
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
});

// Login of register user

router.post("/demo/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const result = await User.findOne({ name: name });
    if (!result)
      return res.status(400).json({ message: "Invalid credentials." });
    const same = await bcrypt.compare(password, result.password);
    if (same) {
      const token = result.generateAuthToken(name, password);
      return res.status(200).json({ token, Data: result });
    } else {
      res.status(400).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    res.status(400).json({
      message: err?.message,
    });
  }
});

// Protected URL

router.get("/protected", auth, async (req, res) => {
  res.status(200).json({ message: "You are able to access" });
});

module.exports = router;
