import express from "express";
import Hotel from '../models/Hotel.js';
const router = express.Router();
import createError from '../utils/error.js';
import {createHotel, deleteHotel, getHotel, updateHotel, getAllHotels, countByCity} from '../controllers/hotel.js';
import { verifyAdmin } from "../utils/verifyToken.js";





// Create
router.post("/", verifyAdmin,  createHotel);

// Update

router.put("/:id", verifyAdmin,  updateHotel);

// Delete

router.delete("/:id", verifyAdmin, deleteHotel);

// Get

router.get("/find/:id", getHotel);

// Get All

router.get("/", getAllHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', getAllHotels);


export default router