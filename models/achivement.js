const db = require('../util/database');

module.exports = class Achivement {
    constructor(name, performer_id, id) {
        this.id = id ? id : null;
        this.name = name;
        this.performer_id = performer_id;
    }

    async save() {
        if (this.id) {
            return db.query(
                "UPDATE Achivement SET name = ? performer_id = ? WHERE id = ?",
                [this.name, this.performer_id, this.id]
            );
        }
        return db.query(
            "INSERT INTO Achivement (name, performer_id) VALUES (?, ?)",
            [this.name, this.performer_id]
        );
    }

    static async getAchivementById(achivementId) {
        const [rows] = await db.query("SELECT * FROM Achivement WHERE id = ?", [achivementId]);
        const achivementRow = rows[0];
        return new Achivement(achivementRow.name, achivementRow.performer_id, achivementRow.id);
    }

    static async getAchivements(pageNumber, pageSize) {
        const achivements = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query("SELECT * FROM Achivement LIMIT ?,?", [startRow, startRow + +pageSize]);
        for (const achivementRow of rows) {
            achivements.push(new Achivement(achivementRow.name, achivementRow.performer_id, achivementRow.id));
        }
        return achivements;
    }
}