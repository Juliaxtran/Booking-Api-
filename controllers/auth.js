
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import createError from '../utils/error.js';
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
  try {

    // hash password


    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);


    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    await newUser.save();
    res.status(200).send("New user created");

  } catch (error) {
    next(error)
  }

}



export const login = async (req, res, next) => {
  try {

    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    // Compare hash password

    const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Password is not correct"));

    // Create and assign token
    const token  = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

    const { password, isAdmin, ...others } = user._doc;
    res
    .cookie("access_token", token, {
      httpOnly: true})
    .status(200)
    .json({ ...others });

  } catch (error) {
    next(error)
  }
}