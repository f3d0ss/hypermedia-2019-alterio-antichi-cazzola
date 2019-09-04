const db = require('../util/database');

module.exports = class Performer {
    constructor(name, achievements, detail, age, birth, company_id, photos, id) {
        this.id = id ? id : null;
        this.name = name;
        this.achievements = achievements;
        this.detail = detail;
        this.age = age;
        this.birth = birth;
        this.company_id = company_id;
        this.photos = photos;
    }

    async save() {
        if (this.id) {
            for (const photo of this.photos) {
                db.query(
                    "INSERT IGNORE INTO PerformerPhoto (path, performer_id) VALUES (?,?); ",
                    [photo, this.id]
                );
            }
            let queryQuestionMarks = '';
            if (this.achievements && this.achievements.length > 0) {
                queryQuestionMarks = '?';
                for (let i = 0; i < this.achievements.length - 1; i++) {
                    queryQuestionMarks += ', ?';
                }
            }
            await db.query(
                "DELETE FROM Achievement WHERE performer_id = ? AND id NOT IN (" + queryQuestionMarks + ")",
                this.achievements
            );
            return db.query("UPDATE Performer SET name = ?, detail = ?, company_id = ?, age = ?, birth = ? WHERE id = ?;",
                [this.name, this.detail, this.company_id, this.age, this.birth, this.id]);
        }
        const ResultSetHeader = await db.query(
            "INSERT INTO Performer (name, detail, age, birth, company_id, id) VALUES (? ,? ,? ,?, ?, ?);",
            [this.name, this.detail, this.age, this.birth, this.company_id, this.id]
        );
        this.id = ResultSetHeader[0].insertId;
        for (const photo of this.photos) {
            db.query(
                'INSERT INTO PerformerPhoto (path, performer_id) VALUES (?,?); ',
                [photo, this.id]
            );
        }
        console.log(this.achievements);
        for (const achivement of this.achievements) {
            db.query(
                'INSERT INTO Achievement (name, performer_id) VALUES (?,?); ',
                [achivement, this.id]
            );
        }
    }

    static async getPerformerById(performerId) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM Performer WHERE id = ?",
                [performerId]
            );
            const performers = await this.getPerformersFromRows(rows);
            return (performers);
        } catch (err) {
            console.log(err);
        }
    }

    static async getPerformers(pageNumber, pageSize) {
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            `SELECT *
                FROM Performer
                LIMIT ?,?`, [startRow, startRow + +pageSize]
        );
        console.log(rows);
        return this.getPerformersFromRows(rows);
    }

    static async getPerformersByEvent(pageNumber, pageSize, eventId) {
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;

        const res = await db.query("SELECT performer_id FROM PerformerEvent WHERE event_id = ?", [eventId]);
        const performerIds = res[0].map(row => row.performer_id);
        console.log(performerIds);
        if (performerIds.length === 0)
            return [];
        const params = [];
        let query = "SELECT * FROM Performer WHERE id IN (";
        params.push(performerIds.pop());
        query += "?";
        for (const performerId of performerIds) {
            params.push(performerId);
            query += ",?";
        }
        query += ") ";
        query += "LIMIT ?,?";
        params.push(startRow, startRow + +pageSize);
        const [rows] = await db.query(
            query,
            params
        );

        return this.getPerformersFromRows(rows);
    }


    static async getPerformersByCompany(pageNumber, pageSize, companyId) {
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            `SELECT *
                FROM Performer
                WHERE company_id = ?
                LIMIT ?,?`, [companyId, startRow, startRow + +pageSize]
        );
        console.log(rows);
        return this.getPerformersFromRows(rows);
    }


    static async getPerformersFromRows(rows) {
        const performers = [];
        for (const performer of rows) {
            const achivementRes = await db.query(
                "SELECT name FROM Achievement WHERE performer_id = ?",
                [performer.id]
            );
            const achievements = achivementRes[0].map(achivementRow => achivementRow.name);

            const photoRes = await db.query(
                " SELECT path FROM PerformerPhoto WHERE performer_id = ?",
                [performer.id]
            );
            const photos = photoRes[0].map(pathObj => pathObj.path);
            performers.push(new Performer(
                performer.name,
                achievements,
                performer.detail,
                performer.age,
                performer.birth,
                performer.company_id,
                photos,
                performer.id
            ));
        }
        return performers;
    }
}