const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const registerControllers = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // console.log(name, email, password);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter All Fields",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log(hashedPassword);

    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const loginControllers = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Convert Mongoose doc to plain JS object to safely delete password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      user: userWithoutPassword,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const setAvatarController = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const imageData = req.body.image;

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: imageData,
      },
      { new: true }
    );

    return res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

const allUsers = async (req, res, next) => {
  try {
    const user = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerControllers,
  loginControllers,
  setAvatarController,
  allUsers,
};
