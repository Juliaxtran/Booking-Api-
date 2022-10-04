import Hotel from "../models/Hotel.js";

// Create
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);

  } catch (error) {
     next(error);
  }
}


// Update
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    })
    res.status(200).json(updatedHotel);

  } catch (error) {
     next(error);
  }
}

//Delete
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");

  } catch (error) {
     next(error);
  }
}

// get Hotel by id
export const getHotel = async (req, res, next) => {
  try {
    const hotel =  await Hotel.findById(req.params.id);
    res.status(200).json(hotel);

  } catch (error) {
     next(error);
  }
}

// get all hotels

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels =  await Hotel.find();
    res.status(200).json(hotels);

  } catch (err) {
     next(error);
  }
}