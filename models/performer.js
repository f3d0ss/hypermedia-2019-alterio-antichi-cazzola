const db = require('../util/database');

module.exports = class Performer {
    constructor(name, achivements, detail, company_id, main_field, photos, id) {
        this.id = id ? id : null;
        this.name = name;
        this.achivements = achivements;
        this.detail = detail;
        this.company_id = company_id;
        this.main_field = main_field;
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
            if (this.achivements && this.achivements.length > 0) {
                queryQuestionMarks = '?';
                for (let i = 0; i < this.achivements.length - 1; i++) {
                    queryQuestionMarks += ', ?';
                }
            }
            await db.query(
                "DELETE FROM Achivement WHERE performer_id = ? AND id NOT IN (" + queryQuestionMarks + ")",
                this.achivements
            );
            return db.query("UPDATE Performer SET name = ?, detail = ?, company_id = ?, main_field = ? WHERE id = ?;",
                [this.name, this.detail, this.company_id, this.main_field, this.id]);
        }
        const ResultSetHeader = await db.query(
            "INSERT INTO Performer (name, detail, company_id, main_field, id) VALUES (? ,? ,? ,? ,?);",
            [this.name, this.detail, this.company_id, this.main_field, this.id]
        );
        this.id = ResultSetHeader[0].insertId;
        for (const photo of this.photos) {
            db.query(
                'INSERT INTO PerformerPhoto (path, performer_id) VALUES (?,?); ',
                [photo, this.id]
            );
        }
    }

    static async getPerformerById(performerId) {
        try {
            const photoRes = await db.query(
                " SELECT path FROM PerformerPhoto WHERE performer_id = ?",
                [performerId]
            );
            const photos = photoRes[0].map(pathObj => pathObj.path);

            const achivementRes = await db.query(
                "SELECT id FROM Achivement WHERE performer_id = ?",
                [performerId]
            );
            const achivements = achivementRes[0].map(achivementRow => achivementRow.id);

            const [rows] = await db.query(
                "SELECT * FROM Performer WHERE id = ?",
                [performerId]
            );
            if (rows.length === 0)
                return null;
            const performer = rows[0];
            return new Performer(
                performer.name,
                achivements,
                performer.detail,
                performer.company_id,
                performer.main_field,
                photos,
                performer.id
            );
        } catch (err) {
            console.log(err);
        }
    }

    static async getPerformers(pageNumber, pageSize) {
        const performers = [];
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
        for (const performer of rows) {
            const achivementRes = await db.query(
                "SELECT id FROM Achivement WHERE performer_id = ?",
                [performer.id]
            );
            const achivements = achivementRes[0].map(achivementRow => achivementRow.id);

            const photoRes = await db.query(
                " SELECT path FROM PerformerPhoto WHERE performer_id = ?",
                [performer.id]
            );
            const photos = photoRes[0].map(pathObj => pathObj.path);
            performers.push(new Performer(
                performer.name,
                achivements,
                performer.detail,
                performer.company_id,
                performer.main_field,
                photos,
                performer.id
            ));
        }
        return performers;
    }
}