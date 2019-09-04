const db = require('../util/database');

module.exports = class Seminar {
    constructor(title, abstract, location_id, date, start, end, vacancy, id) {
        this.id = id ? id : null;
        this.title = title;
        this.abstract = abstract
        this.location_id = location_id;
        this.date = date;
        this.start = start;
        this.end = end;
        this.vacancy = vacancy;
    }

    async save() {
        if (this.id) {
            return db.query("UPDATE Seminar SET title = ?, abstract = ?, location_id = ?, date = ?, start = ?, end = ?, vacancy = ? WHERE id = ?;",
                [this.title, this.abstract, this.location_id, this.date, this.start, this.end, this.vacancy, this.id]);
        }
        const ResultSetHeader = await db.query(
            "INSERT INTO Seminar (title, abstract, location_id, date, start, end, vacancy) VALUES (?, ? ,? ,? ,? ,? ,?);",
            [this.title, this.abstract, this.location_id, this.date, this.start, this.end, this.vacancy]
        );
        this.id = ResultSetHeader[0].insertId;
    }

    static async getSeminarById(seminarId) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM Seminar WHERE id = ?",
                [seminarId]
            );
            if (rows.length === 0)
                return null;
            const seminar = rows[0];
            return new Seminar(
                seminar.title,
                seminar.abstract,
                seminar.location_id,
                seminar.date,
                seminar.start,
                seminar.end,
                seminar.vacancy,
                seminar.id
            );
        } catch (err) {
            console.log(err);
        }
    }

    static async getSeminars(pageNumber, pageSize) {
        const seminars = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            `SELECT *
                FROM Seminar ORDER BY date, start
                LIMIT ?,?`, [startRow, startRow + +pageSize]
        );
        for (const seminar of rows) {
            seminars.push(new Seminar(
                seminar.title,
                seminar.abstract,
                seminar.location_id,
                seminar.date,
                seminar.start,
                seminar.end,
                seminar.vacancy,
                seminar.id
            ));
        }
        return seminars;
    }
}