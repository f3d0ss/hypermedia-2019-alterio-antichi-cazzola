const db = require('../util/database');

module.exports = class ArtisticField {
    constructor(name, id) {
        this.id = id;
        this.name = name;
    }

    async save() {
        if (this.id) {
            return db.query(
                "UPDATE ArtisticField SET name = ? WHERE id = ?",
                [this.name, this.id]
            );
        }
        const ResultSetHeader = await db.query(
            "INSERT INTO ArtisticField (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?",
            [this.id, this.name, this.name]
        );
        this.id = ResultSetHeader[0].insertId;
    }

    static async getArtisticFieldById(artisticFieldId) {
        const [rows] = await db.query("SELECT * FROM ArtisticField WHERE id = ?", [artisticFieldId]);
        const artisticFieldRow = rows[0];
        return new ArtisticField(artisticFieldRow.id, artisticFieldRow.name);
    }

    static async getArtisticFields() {
        const artisticFields = [];
        const [rows] = await db.query("SELECT * FROM ArtisticField");
        for (const artisticFieldRow of rows) {
            artisticFields.push(new ArtisticField(artisticFieldRow.id, artisticFieldRow.name));
        }
        return artisticFields;
    }
}