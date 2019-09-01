const db = require('../util/database');

module.exports = class Reservation {
    constructor(user_id, event_id, id) {
        this.id = id ? id : null;
        this.user_id = user_id;
        this.event_id = event_id;
    }

    async save() {
        if (this.id) {
            return db.query("UPDATE Reservation SET user_id = ?, event_id = ? WHERE id = ?;",
                [this.user_id, this.event_id, this.id]);
        }
        const ResultSetHeader = await db.query(
            "INSERT INTO Reservation (user_id, event_id) VALUES (? ,?);",
            [this.user_id, this.event_id]
        );
        this.id = ResultSetHeader[0].insertId;
    }

    static async getReservationById(reservationId) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM Reservation WHERE id = ?",
                [reservationId]
            );
            if (rows.length === 0)
                return null;
            const reservation = rows[0];
            return new Reservation(
                reservation.user_id,
                reservation.event_id,
                reservation.id
            );
        } catch (err) {
            console.log(err);
        }
    }

    static async getReservations(pageNumber, pageSize) {
        const reservations = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            `SELECT *
                FROM Reservation
                LIMIT ?,?`, [startRow, startRow + +pageSize]
        );
        for (const reservation of rows) {
            reservations.push(new Reservation(
                reservation.user_id,
                reservation.event_id,
                reservation.id
            ));
        }
        return reservations;
    }

    static async getReservationsByUser(pageNumber, pageSize, user_id) {
        const reservations = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            `SELECT *
                FROM Reservation
                WHERE user_id = ?
                LIMIT ?,?`, [user_id, startRow, startRow + +pageSize]
        );
        for (const reservation of rows) {
            reservations.push(new Reservation(
                reservation.user_id,
                reservation.event_id,
                reservation.id
            ));
        }
        return reservations;
    }



    static async deleteReservation(reservationId) {
        try {
            await db.query(
                "DELETE FROM Reservation WHERE id = ?",
                [reservationId]
            );
        } catch (err) {
            console.log(err);
        }
    }
}