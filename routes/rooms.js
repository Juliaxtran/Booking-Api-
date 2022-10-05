import express from "express";
const router = express.Router();
import { createRoom, deleteRoom, getRoom, updateRoom, getAllRooms} from '../controllers/room.js';
import { verifyAdmin } from "../utils/verifyToken.js";





// Create
router.post("/:hotelId", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin,  updateRoom);

// Delete

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// Get

router.get("/:id", getRoom);

// Get All

router.get("/", getAllRooms);

export default router