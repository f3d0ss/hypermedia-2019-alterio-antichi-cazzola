const Location = require('../../../models/location');

exports.getLocations = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const locations = await Location.getLocations(pageNumber, pageSize);
        res.status(200).json(locations);
    } catch (error) {
        next(error);
    }
}

exports.getLocationById = async (req, res, next) => {
    const locationId = req.params.locationId;
    try {
        const location = await Location.getLocationById(locationId);
        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
}

exports.postLocation = async (req, res, next) => {
    const id = req.body.id;
    const how_to_reach = req.body.how_to_reach;

    try {
        const location = new Location(id, how_to_reach);
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        next(error);
    }
}