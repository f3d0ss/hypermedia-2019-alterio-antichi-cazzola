const Reservation = require('../../../models/reservation');

exports.getReservations = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const reservations = await Reservation.getReservations(pageNumber, pageSize);
        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
}

exports.postReservation = async (req, res, next) => {
    const user_id = req.body.userId;
    const event_id = req.body.eventId;
    try {
        const reservation = new Reservation(user_id, event_id);
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
}

exports.getReservationsByUser = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const user_id = req.params.userId;
    try {
        const reservations = await Reservation.getReservationsByUser(pageNumber, pageSize, user_id);
        res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
}

exports.deleteReservation = async (req, res, next) => {
    const reservationId = req.params.reservationId;
    try {
        await Reservation.deleteReservation(reservationId);
        res.status(200).json({
            messagge: 'The reservation has been deleted'
        });
    } catch (error) {
        next(error);
    }
}