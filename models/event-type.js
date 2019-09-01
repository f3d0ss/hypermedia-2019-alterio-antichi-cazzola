const db = require('../util/database');

module.exports = class EventType {
    constructor(event_type) {
        this.event_type = event_type;
    }

    async save() {
        const ResultSetHeader = await db.query(
            "INSERT INTO EventType (event_type) VALUES (?) ON DUPLICATE KEY UPDATE event_type = ?",
            [this.event_type, this.event_type]
        );
    }

    static async getEventTypeById(event_type) {
        const [rows] = await db.query("SELECT * FROM EventType WHERE event_type = ?", [event_type]);
        const eventTypeRow = rows[0];
        return new EventType(eventTypeRow.event_type);
    }

    static async getEventTypes(pageNumber, pageSize) {
        const eventTypes = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query("SELECT * FROM EventType LIMIT ?,?", [startRow, startRow + +pageSize]);
        for (const eventTypeRow of rows) {
            eventTypes.push(new EventType(eventTypeRow.event_type));
        }
        return eventTypes;
    }
}