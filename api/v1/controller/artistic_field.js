const ArtisticField = require('../../../models/artistic_field');

exports.getArtisticFields = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const artisticFields = await ArtisticField.getArtisticFields(pageNumber, pageSize);
        res.status(200).json(artisticFields);
    } catch (error) {
        next(error);
    }
}

exports.getArtisticFieldById = async (req, res, next) => {
    const artisticFieldId = req.params.artisticFieldId;
    try {
        const artisticField = await ArtisticField.getArtisticFieldById(artisticFieldId);
        res.status(200).json(artisticField);
    } catch (error) {
        next(error);
    }
}

exports.postArtisticField = async (req, res, next) => {
    const name = req.body.name;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed, entered data is incorrect.');
    //   error.statusCode = 422;
    //   throw error;
    try {
        const artisticField = new ArtisticField(name);
        await artisticField.save();
        res.status(201).json(artisticField);
    } catch (error) {
        next(error);
    }
}