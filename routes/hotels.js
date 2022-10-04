import express from "express";
import Hotel from '../models/Hotel.js';
const router = express.Router();





// Create
router.post("/", async (req, res) => {

  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update
// Get model and chain what you want to do with it
// get the id for the request parameter
// set method allows you to set the fields you want to update
// $set operator replaces the value of a field with the specified value.
//The $set operator expression has the following form: { $set: { <field1>: <value1>, ... } }

router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    })
    res.status(200).json(updatedHotel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get

router.get("/:id", async (req, res) => {
  try {
    const hotel =  await Hotel.findById(req.params.id);
    res.status(200).json(hotel);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All

router.get("/", async (req, res, next) => {

  const failed = true;
  const err = new Error();
  err.status = 400 ;
  err.message = "Something went wrong";
  if (failed) return next(err);

  try {
    const hotels =  await Hotel.findById('ASFAFAFA');
    res.status(200).json(hotels);

  } catch (err) {
    // res.status(500).json({ message: error.message });
    next(err);
  }

});

export default router