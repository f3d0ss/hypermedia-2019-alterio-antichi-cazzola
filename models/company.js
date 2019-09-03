const db = require('../util/database');

module.exports = class Company {
    constructor(name, detail, photos, id) {
        this.id = id ? id : null;
        this.name = name;
        this.detail = detail;
        this.photos = photos;
    }

    async save() {
        if (this.id) {
            for (const photo of this.photos) {
                db.query(
                    "INSERT IGNORE INTO CompanyPhoto (path, company_id) VALUES (?,?); ",
                    [photo, this.id]
                );
            }
            return db.query("UPDATE Company SET name = ?, detail = ? WHERE id = ?;", [this.name, this.detail, this.id]);
        }
        const ResultSetHeader = await db.query(
            "INSERT INTO Company (name, detail) VALUES (? ,?);",
            [this.name, this.detail]
        );
        this.id = ResultSetHeader[0].insertId;
        for (const photo of this.photos) {
            db.query(
                'INSERT INTO CompanyPhoto (path, company_id) VALUES (?,?); ',
                [photo, this.id]
            );
        }
    }

    static async getCompanyById(companyId) {
        try {
            const res = await db.query(
                " SELECT path FROM CompanyPhoto WHERE company_id = ?",
                [companyId]
            );
            const photos = res[0].map(pathObj => pathObj.path);
            const [rows] = await db.query(
                `SELECT * FROM Company WHERE id = ?`,
                [companyId]
            );
            if (rows.length === 0)
                return null;
            const company = rows[0];
            return new Company(
                company.name,
                company.detail,
                photos,
                company.id
            );
        } catch (err) {
            console.log(err);
        }
    }

    static async getCompanies(pageNumber, pageSize) {
        const companies = [];
        if (!pageNumber)
            pageNumber = 0;
        if (!pageSize)
            pageSize = 10;
        const startRow = pageNumber * pageSize;
        const [rows] = await db.query(
            `SELECT *
            FROM Company
            LIMIT ?,?`, [startRow, startRow + +pageSize]
        );
        for (const company of rows) {
            const res = await db.query(
                " SELECT path FROM CompanyPhoto WHERE company_id = ?",
                [company.id]
            );
            const photos = res[0].map(pathObj => pathObj.path);
            companies.push(new Company(
                company.name,
                company.detail,
                photos,
                company.id
            ));
        }
        return companies;
    }
}