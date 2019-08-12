const db = require('../util/database');

module.exports = class ArtisticField {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async save() {
        return db.query(
            "INSTER INTO ArtisticField (id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?",
            [this.id, this.name, this.name]
        );
    }

    static async getArtisticFieldById(artisticFieldId) {
        const [rows] = db.query("SELECT * FORM ArtisticField WHERE id = ?", [artisticFieldId]);
        const artisticFieldRow = rows[0];
        return new ArtisticField(artisticFieldRow.id, artisticFieldRow.name);
    }

    static async getArtisticFields() {
        const artisticFields = [];
        const [rows] = db.query("SELECT * FORM ArtisticField");
        for (const artisticFieldRow of rows) {
            artisticFields.push(new ArtisticField(artisticFieldRow.id, artisticFieldRow.name));
        }
        return artisticFields;
    }
}