const venueService = require("../services/venue.service");

const createVenueController = async (req, res, next) => {
  try {
    const venue = await venueService.create(req.body);
    res.status(201).json({
      venue,
    });
  } catch (error) {
    next(error);
  }
};

const getVenuesController = async (req, res, next) => {
  try {
    const venues = await venueService.getAll(req.query);
    res.json({ ...venues });
  } catch (error) {
    next(error);
  }
};

const getVenueController = async (req, res, next) => {
  try {
    const venue = await venueService.getOne(req.params);
    console.log("heye")
    res.json({ venue });
  } catch (error) {
    next(error);
  }
};

const updateVenueController = async (req, res, next) => {
  try {
    const venue = await venueService.update(req.params, req.body);
    res.json({ venue });
  } catch (error) {
    next(error);
  }
};

const deleteVenueController = async (req, res, next) => {
  try {
    const venue = await venueService.delete(req.params);
    res.json({ message: "Selected Venue is deleted" });
  } catch (error) {
    next(error);
  }
};

const venueController = {
  create: createVenueController,
  getAll: getVenuesController,
  getOne: getVenueController,
  update: updateVenueController,
  delete: deleteVenueController,
};

module.exports = venueController;
