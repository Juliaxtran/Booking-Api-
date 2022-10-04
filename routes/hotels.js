import express from "express";
import Hotel from '../models/Hotel.js';
const router = express.Router();
import createError from '../utils/error.js';
import {createHotel, deleteHotel, getHotel, updateHotel, getAllHotels} from '../controllers/hotel.js';





// Create
router.post("/", createHotel);

// Update
// Get model and chain what you want to do with it
// get the id for the request parameter
// set method allows you to set the fields you want to update
// $set operator replaces the value of a field with the specified value.
//The $set operator expression has the following form: { $set: { <field1>: <value1>, ... } }

router.put("/:id", updateHotel);

// Delete

router.delete("/:id", deleteHotel);

// Get

router.get("/:id", getHotel);

// Get All

router.get("/", getAllHotels);

export default router