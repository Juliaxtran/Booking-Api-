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

// Get model and chain what you want to do with it
// get the id for the request parameter
// set method allows you to set the fields you want to update
// $set operator replaces the value of a field with the specified value.
//The $set operator expression has the following form: { $set: { <field1>: <value1>, ... } }

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
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);

  } catch (error) {
    next(error);
  }
}

// get all hotels

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);

  } catch (err) {
    next(error);
  }
}

// on main page first compoent is featured
// http://localhost:3002/api/hotels/countByCity?cities=berlin, madrid, london
// will have a query (cities) and the value (berlin, madrid, london)


export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({ city: city })
    }))
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}



export const countByType = async (req, res, next) => {

  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json([
      { type: 'hotel', count: hotelCount },
      { type: 'apartment', count: apartmentCount },
      { type: 'resort', count: resortCount },
      { type: 'villa', count: villaCount },
      { type: 'cabin', count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
}