import express from "express";
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

// Delete

// Get

// Get All



export default router