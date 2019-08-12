const db = require('../util/database');

module.exports = class Location {
    constructor(id, how_to_reach) {
        this.id = id;
        this.how_to_reach = how_to_reach;
    }

    async save() {
        return db.query(
            "INSTER INTO Location (id, how_to_reach) VALUES (?, ?) ON DUPLICATE KEY UPDATE how_to_reach = ?",
            [this.id, this.how_to_reach, this.how_to_reach]
        );
    }

    static async getLocationById(locationId) {
        const [rows] = db.query("SELECT * FORM Location WHERE id = ?", [locationId]);
        const locationRow = rows[0];
        return new Location(locationRow.id, locationRow.how_to_reach);
    }

    static async getLocations() {
        const locations = [];
        const [rows] = db.query("SELECT * FORM Location");
        for (const locationRow of rows) {
            locations.push(new Location(locationRow.id, locationRow.how_to_reach));
        }
        return locations;
    }
}