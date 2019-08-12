const mysql = require('mysql2');

const config = require('../configuration/configuration');

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD
});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();


promisePool
    .query("DROP DATABASE festivalDB")
    .then(() =>
        createDatabase()
    ).catch(err =>
        createDatabase()
    );


function createDatabase() {
    promisePool
        .query("CREATE DATABASE festivalDB")
        .then(() => {
            console.log("Database created");
            const pool = mysql.createPool({
                host: config.DB_HOST,
                user: config.DB_USER,
                password: config.DB_PASSWORD,
                database: config.DB_NAME
            });
            const promisePoolDb = pool.promise();
            createTables(promisePoolDb);
        }).catch(err => console.log(err));
}

async function createTables(promisePoolDb) {
    try {

        createUserTable(promisePoolDb);
        await createLocationTable(promisePoolDb);
        await createSeminarTable(promisePoolDb);
        await createEventTable(promisePoolDb);
        await createCompanyTable(promisePoolDb);
        await createCompanyPhotoTable(promisePoolDb);
        await createArtisticFieldTable(promisePoolDb);
        await createPerformerTable(promisePoolDb);
        await createPerformerPhotoTable(promisePoolDb);
        await createAchivementTable(promisePoolDb);
        await createPerformerEventTable(promisePoolDb);
        console.log("Tables created");
    } catch (error) {
        console.log(error);
    }
}

function createUserTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE User (
            id int PRIMARY KEY AUTO_INCREMENT,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL
    );`);
}

function createLocationTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Location (
        id varchar(3) PRIMARY KEY,
        how_to_reach text NOT NULL
    );`);
}

function createEventTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Event (
        id int PRIMARY KEY AUTO_INCREMENT,
        name varchar(255) NOT NULL UNIQUE,
        abstract varchar(255) NOT NULL,
        date date NOT NULL,
        start time NOT NULL,
        end time NOT NULL,
        location_id varchar(3) NOT NULL,
        vacancy int NOT NULL,
        seminar_id int,
        FOREIGN KEY (location_id) REFERENCES Location(id),
        FOREIGN KEY (seminar_id) REFERENCES Seminar(id)
    );`);
}

function createSeminarTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Seminar (
            id int PRIMARY KEY AUTO_INCREMENT,
            title varchar(255) NOT NULL UNIQUE,
            date date NOT NULL,
            start time NOT NULL,
            end time NOT NULL,
            location_id varchar(3) NOT NULL,
            vacancy int NOT NULL,
            FOREIGN KEY (location_id) REFERENCES Location(id)
        );`);
}

function createCompanyTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Company (
            id int PRIMARY KEY AUTO_INCREMENT,
            name varchar(255) NOT NULL UNIQUE,
            detail text NOT NULL
        );`);
}

function createArtisticFieldTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE ArtisticField (
            id int PRIMARY KEY AUTO_INCREMENT,
            name varchar(255) NOT NULL UNIQUE
        );`);
}

function createPerformerTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Performer (
            id int PRIMARY KEY AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            company_id int,
            main_field int NOT NULL,
            detail text NOT NULL,
            FOREIGN KEY (company_id) REFERENCES Company(id),
            FOREIGN KEY (main_field) REFERENCES ArtisticField(id)
        );`);
}

function createCompanyPhotoTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE CompanyPhoto (
            path varchar(255) PRIMARY KEY,
            company_id int NOT NULL,
            FOREIGN KEY (company_id) REFERENCES Company(id)
        );`);
}

function createPerformerPhotoTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE PerformerPhoto (
            path varchar(255) PRIMARY KEY,
            performer_id int NOT NULL,
            FOREIGN KEY (performer_id) REFERENCES Performer(id)
        );`);
}

function createAchivementTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Achivement (
            id int PRIMARY KEY AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            performer_id int NOT NULL,
            FOREIGN KEY (performer_id) REFERENCES Performer(id)
        );`);
}

function createPerformerEventTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE PerformerEvent (
        event_id int NOT NULL,
        performer_id int NOT NULL,
        PRIMARY KEY (event_id, performer_id),
        FOREIGN KEY (event_id) REFERENCES Event(id),
        FOREIGN KEY (performer_id) REFERENCES Performer(id)
    );`);
}