const db = require('../util/database');

module.exports = class Event {
    constructor(name, abstract, date, start, end, vacancy, location_id, seminar_id, performer_ids, company_ids, event_type, id) {
        this.id = id ? id : null;
        this.name = name;
        this.abstract = abstract;
        this.date = date;
        this.start = start;
        this.end = end;
        this.vacancy = vacancy;
        this.location_id = location_id;
        this.seminar_id = seminar_id;
        this.performer_ids = performer_ids;
        this.company_ids = company_ids;
        this.event_type = event_type;
    }

    async save() {
        if (this.id) {
            // update performer
            return db.query("UPDATE Event SET name = ?, abstract = ?, date = ?, start = ?, end = ?, location_id = ?, vacancy = ?, seminar_id = ?, event_type = ? WHERE id = ?;",
                [this.name, this.abstract, this.date, this.start, this.end, this.location_id, this.vacancy, this.seminar_id, this.event_type, this.id]);
        }
        const ResultSetHeader = await db.query(
            "INSERT INTO Event (name, abstract, date, start, end, location_id, vacancy, seminar_id, event_type) VALUES (? ,? ,? ,? ,? ,? ,?, ?, ?);",
            [this.name, this.abstract, this.date, this.start, this.end, this.location_id, this.vacancy, this.seminar_id, this.event_type]
        );
        this.id = ResultSetHeader[0].insertId;
        if (this.performer_ids && this.performer_ids.length > 0) {
            let query = "INSERT INTO PerformerEvent (event_id, performer_id) VALUES ";
            const params = [];
            for (const performer_id of this.performer_ids) {
                query = query + "(?, ?) ";
                params.push(this.id, performer_id);
            }
            await db.query(query, params);
        }
        if (this.company_ids && this.company_ids.length > 0) {
            let query = "INSERT INTO CompanyEvent (event_id, company_id) VALUES ";
            const params = [];
            for (const company_id of this.company_ids) {
                query = query + "(?, ?) ";
                params.push(this.id, company_id);
            }
            await db.query(query, params);
        }
    }

    static async getEventById(eventId) {
        const [rows] = await db.query(
            "SELECT * FROM Event WHERE id = ?",
            [eventId]
        );
        if (rows.length === 0)
            return null;
        const event = rows[0];
        const performer_res = await db.query(
            "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
            [event.id]
        );
        const performer_ids = performer_res[0].map(performerId => performerId.performer_id);

        const res = await db.query(
            "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
            [event.id]
        );
        const company_ids = res[0].map(companyId => companyId.company_id);
        return new Event(
            event.name,
            event.abstract,
            event.date,
            event.start,
            event.end,
            event.vacancy,
            event.location_id,
            event.seminar_id,
            performer_ids,
            company_ids,
            event.event_type,
            event.id
        );
    }

    static async getEvents(pageNumber, pageSize) {
        const events = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            "SELECT * FROM Event ORDER BY date, start LIMIT ?,?",
            [startRow, startRow + +pageSize]
        );
        for (const event of rows) {
            const performer_res = await db.query(
                "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
                [event.id]
            );
            const performer_ids = performer_res[0].map(performerId => performerId.performer_id);

            const res = await db.query(
                "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
                [event.id]
            );
            const company_ids = res[0].map(companyId => companyId.company_id);

            events.push(new Event(
                event.name,
                event.abstract,
                event.date,
                event.start,
                event.end,
                event.vacancy,
                event.location_id,
                event.seminar_id,
                performer_ids,
                company_ids,
                event.event_type,
                event.id
            ));
        }
        return events;
    }

    static async getEventsByPerformer(pageNumber, pageSize, performerId) {
        const events = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const res = await db.query("SELECT event_id FROM PerformerEvent WHERE performer_id = ?", [performerId]);
        const eventIds = res[0].map(row => row.event_id);
        if (eventIds.length === 0)
            return [];
        const params = [];
        let query = "SELECT * FROM Event WHERE id IN (";
        params.push(eventIds.pop());
        query += "?";
        for (const eventId of eventIds) {
            params.push(eventId);
            query += ",?";
        }
        query += ") ";
        query += "ORDER BY date, start LIMIT ?,?";
        params.push(startRow, startRow + +pageSize);
        const [rows] = await db.query(
            query,
            params
        );
        for (const event of rows) {
            const performer_res = await db.query(
                "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
                [event.id]
            );
            const performer_ids = performer_res[0].map(performerId => performerId.performer_id);

            const res = await db.query(
                "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
                [event.id]
            );
            const company_ids = res[0].map(companyId => companyId.company_id);

            events.push(new Event(
                event.name,
                event.abstract,
                event.date,
                event.start,
                event.end,
                event.vacancy,
                event.location_id,
                event.seminar_id,
                performer_ids,
                company_ids,
                event.event_type,
                event.id
            ));
        }
        return events;
    }

    static async getEventsByCompany(pageNumber, pageSize, companyId) {
        const events = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const res = await db.query("SELECT event_id FROM CompanyEvent WHERE company_id = ?", [companyId]);
        const eventIds = res[0].map(row => row.event_id);
        if (eventIds.length === 0)
            return [];
        const params = [];
        let query = "SELECT * FROM Event WHERE id IN (";
        params.push(eventIds.pop());
        query += "?";
        for (const eventId of eventIds) {
            params.push(eventId);
            query += ",?";
        }
        query += ") ";
        query += "ORDER BY date, start LIMIT ?,?";
        params.push(startRow, startRow + +pageSize);
        const [rows] = await db.query(
            query,
            params
        );
        for (const event of rows) {
            const performer_res = await db.query(
                "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
                [event.id]
            );
            const performer_ids = performer_res[0].map(performerId => performerId.performer_id);
            const res = await db.query(
                "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
                [event.id]
            );
            const company_ids = res[0].map(companyId => companyId.company_id);

            events.push(new Event(
                event.name,
                event.abstract,
                event.date,
                event.start,
                event.end,
                event.vacancy,
                event.location_id,
                event.seminar_id,
                performer_ids,
                company_ids,
                event.event_type,
                event.id
            ));
        }
        return events;
    }

    static async getEventsByLoction(pageNumber, pageSize, locationId) {
        const events = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            "SELECT * FROM Event WHERE location_id = ? ORDER BY date, start LIMIT ?,?",
            [locationId, startRow, startRow + +pageSize]
        );
        for (const event of rows) {
            const performer_res = await db.query(
                "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
                [event.id]
            );
            const performer_ids = performer_res[0].map(performerId => performerId.performer_id);

            const res = await db.query(
                "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
                [event.id]
            );
            const company_ids = res[0].map(companyId => companyId.company_id);

            events.push(new Event(
                event.name,
                event.abstract,
                event.date,
                event.start,
                event.end,
                event.vacancy,
                event.location_id,
                event.seminar_id,
                performer_ids,
                company_ids,
                event.event_type,
                event.id
            ));
        }
        return events;
    }

    static async getEventsByDate(pageNumber, pageSize, date) {
        const events = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            "SELECT * FROM Event WHERE date = ? ORDER BY date, start LIMIT ?,?",
            [date, startRow, startRow + +pageSize]
        );
        for (const event of rows) {
            const performer_res = await db.query(
                "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
                [event.id]
            );
            const performer_ids = performer_res[0].map(performerId => performerId.performer_id);

            const res = await db.query(
                "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
                [event.id]
            );
            const company_ids = res[0].map(companyId => companyId.company_id);

            events.push(new Event(
                event.name,
                event.abstract,
                event.date,
                event.start,
                event.end,
                event.vacancy,
                event.location_id,
                event.seminar_id,
                performer_ids,
                company_ids,
                event.event_type,
                event.id
            ));
        }
        return events;
    }

    static async getEventsBySeminar(pageNumber, pageSize, seminarId) {
        const events = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            "SELECT * FROM Event WHERE seminar_id = ? ORDER BY date, start LIMIT ?,?",
            [seminarId, startRow, startRow + +pageSize]
        );
        for (const event of rows) {
            const performer_res = await db.query(
                "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
                [event.id]
            );
            const performer_ids = performer_res[0].map(performerId => performerId.performer_id);

            const res = await db.query(
                "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
                [event.id]
            );
            const company_ids = res[0].map(companyId => companyId.company_id);

            events.push(new Event(
                event.name,
                event.abstract,
                event.date,
                event.start,
                event.end,
                event.vacancy,
                event.location_id,
                event.seminar_id,
                performer_ids,
                company_ids,
                event.event_type,
                event.id
            ));
        }
        return events;
    }

    static async getEventsByType(pageNumber, pageSize, event_type) {
        const events = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            "SELECT * FROM Event WHERE event_type = ? ORDER BY date, start LIMIT ?,?",
            [event_type, startRow, startRow + +pageSize]
        );
        for (const event of rows) {
            const performer_res = await db.query(
                "SELECT performer_id FROM PerformerEvent WHERE event_id = ?",
                [event.id]
            );
            const performer_ids = performer_res[0].map(performerId => performerId.performer_id);

            const res = await db.query(
                "SELECT company_id FROM CompanyEvent WHERE event_id = ?",
                [event.id]
            );
            const company_ids = res[0].map(companyId => companyId.company_id);

            events.push(new Event(
                event.name,
                event.abstract,
                event.date,
                event.start,
                event.end,
                event.vacancy,
                event.location_id,
                event.seminar_id,
                performer_ids,
                company_ids,
                event.event_type,
                event.id
            ));
        }
        return events;
    }
}