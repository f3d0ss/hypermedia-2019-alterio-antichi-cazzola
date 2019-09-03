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
        await createEventTypeTable(promisePoolDb);
        await createEventTable(promisePoolDb);
        await createEventPhotoTable(promisePoolDb);
        await createCompanyTable(promisePoolDb);
        await createCompanyPhotoTable(promisePoolDb);
        await createPerformerTable(promisePoolDb);
        await createPerformerPhotoTable(promisePoolDb);
        await createAchivementTable(promisePoolDb);
        await createPerformerEventTable(promisePoolDb);
        await createCompanyEventTable(promisePoolDb);
        await createSignUpTokenTable(promisePoolDb);
        await createReservationTable(promisePoolDb);
        console.log("Tables created");
    } catch (error) {
        console.log(error);
    }
}

function createUserTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE User (
        id int PRIMARY KEY AUTO_INCREMENT,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        isVerified bit DEFAULT 0
        );`);
}

function createSignUpTokenTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE SignUpToken (
        user_id int PRIMARY KEY,
        signup_token varchar(255),
        FOREIGN KEY (user_id) REFERENCES User(id)
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
        event_type varchar(255) NOT NULL,
        location_id varchar(3) NOT NULL,
        vacancy int NOT NULL,
        seminar_id int,
        FOREIGN KEY (location_id) REFERENCES Location(id),
        FOREIGN KEY (seminar_id) REFERENCES Seminar(id),
        FOREIGN KEY (event_type) REFERENCES EventType(event_type)
    );`);
}

function createSeminarTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Seminar (
            id int PRIMARY KEY AUTO_INCREMENT,
            title varchar(255) NOT NULL UNIQUE,
            abstract varchar(255) NOT NULL,
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

function createEventTypeTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE EventType (
            event_type varchar(255) PRIMARY KEY,
            description text NOT NULL
        );`);
}

function createPerformerTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Performer (
            id int PRIMARY KEY AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            company_id int,
            detail text NOT NULL,
            FOREIGN KEY (company_id) REFERENCES Company(id)
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

function createEventPhotoTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE EventPhoto (
            path varchar(255) PRIMARY KEY,
            event_id int NOT NULL,
            FOREIGN KEY (event_id) REFERENCES Event(id)
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

function createCompanyEventTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE CompanyEvent (
        event_id int NOT NULL,
        company_id int NOT NULL,
        PRIMARY KEY (event_id, company_id),
        FOREIGN KEY (event_id) REFERENCES Event(id),
        FOREIGN KEY (company_id) REFERENCES Company(id)
    );`);
}

function createReservationTable(promisePoolDb) {
    return promisePoolDb.query(`CREATE TABLE Reservation (
        id int PRIMARY KEY AUTO_INCREMENT,
        event_id int NOT NULL,
        user_id int NOT NULL,
        FOREIGN KEY (event_id) REFERENCES Event(id),
        FOREIGN KEY (user_id) REFERENCES User(id),
        UNIQUE (event_id, user_id)
    );`);
}