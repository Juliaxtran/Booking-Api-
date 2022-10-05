import express from "express";
const router = express.Router();
import createError from '../utils/error.js';
import { deleteUser, getUser, updateUser, getAllUsers} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


router.get("/", (req, res) => {
  res.send("Hello this is users  endpoint");
});

// router.get("/checkAuth", verifyToken, (req, res, next) => {
//   res.status(200).send("You are authorized");
// })

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.status(200).send("You are logged in and you can delete your account");
// })


// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.status(200).send("Hello Admin, you are logged in, you are authroized to delete all accounts");
// })



// update user

router.put("/:id", verifyUser, updateUser);

// Delete

router.delete("/:id", verifyUser, deleteUser);

// Get

router.get("/:id", verifyUser, getUser);

// Get All

router.get("/", verifyAdmin,  getAllUsers);

export default router
