# Documentation of the Backend part
> Deliverable D1
## General group information

| Member n. | Role          | First name | Last Name | Matricola | Email address                   |
| --------- | ------------- | ---------- | --------- | --------- | ------------------------------- |
| 1         | Administrator | Federico   | Cazzola   | 869738    | federico.cazzola@mail.polimi.it |
| 2         | Member        | Clarance   | Antichi   | 872878    | clarence.antichi@mail.polimi.it |
| 3         | Member        | Federico   | Alterio   | 871432    | federico.alterio@mail.polimi.it |
## Links to other deliverables
- Deliverable D0: the web application is accessible at [this
address](https://festival-hypermedia.herokuapp.com).
- Deliverable D2: the JSON file containing the specification
of the app API can be found at [this address](https://festival-hypermedia.herokuapp.com/backend/spec.yaml).
- Deliverable D3: the SwaggerUI page of the same API is available at
[this address](https://festival-hypermedia.herokuapp.com/backend/swaggerui).
- Deliverable D4: the source code of D0 is available as a zip file at
[this address](https://festival-hypermedia.herokuapp.com/backend/app.zip).

- Deliverable D5: the address of the online source control repository
is available [this address](https://github.com/f-cazzola/hypermedia-2019-alterio-antichi-cazzola). We hereby declare that this is a private repository and, upon request, we will give access to the instructors.
## Specification
### Web Architecture
#### Web Architecture Schema 1
![Web Architecture Schema 1](https://festival-hypermedia.herokuapp.com/images/doc/web-arc.png)
#### Web Architecture Schema 2
![Web Architecture Schema 2](https://festival-hypermedia.herokuapp.com/images/doc/web-arc-2.png)


We rendered the pages JUST to include piece of html commun in all pages like the navbar or footer. By rendering we avoided any type of inconsistency with the navbar among the pages.
We are sure the dynamic data is NEVER rendered by the server beacause we never access the model classes anywhere but in the API logic (in the API folder)
### API
#### REST compliance
_Describe here to what extent did you follow REST principles and what are
the reasons for which you might have decided to diverge. Note, you must
not describe the whole API here, just the design decisions._
We have created a complete REST API, we didn't implemented all CRUD operations for each model if not necessary for the web application with exeption for the POST API used by our team to populate the database
#### OpenAPI Resource models
- Event
- Seminar
- Location
- Performer
- Company
- EventType
- Reservation
- User
### Data model
![ER diagram](https://festival-hypermedia.herokuapp.com/images/doc/ER-diagram.png)

All OpenAPI models have also an Entity in the ER diagram except for Reservation, which is represented in the diagram as a relationship from User to Event
## Implementation
### Tools used
- express: to simplyfy the creation of a web server and devide routing
- passposrt (with passwport-jwt): to simplify the login and authentication verification process through a JWT
- ejs: just to use the `include` function to smoothen the development of the pages. Makes it easier to apply small changes in
        elements like the navbar without going through all pages
- mysql2: to interact with the MySql server
- bcrypt: to hash the password before save them into the DB
- nodemon: to avoid restarting the server after every change
- nodemailer: to send the email for the email verification (removed the need of verifyig the email after usability evaluation)
- express-openapi-validator: to validate the input of the API in line with the OpenAPI specification
- swagger-ui-express: to provide the a UI to the OpenAPI specification
### Discussion
- We make sure our web application adheres to the provided OpenAPI specification thanks to SwaggerUi because we generete it from the OpenAPI spec file with swagger-ui-express and we used it to extensevly test all the API
- We think our web application adheres to common practices to partition a REST-based web application because we crated API that's easy to understand and documented it with OpenAPI specification. Our API accepts and returns JSON objects with the data, so that anyone can create either a web application, Android application or any other sort of application using the same API.
- We managed the authentication by using the JSON Web Token, returning the JWT when the POST API for login is called. This JWT then needs to be added in the header of the calls to the API that need authentication.
- For managing the data model we used MySQL database mainly because we found more documentation about it than other types of relational databases.
## Other information
### Task assignment
- Clarence Antichi worked on front end (70%) and documentation (30% of the time)
- Federico Alterio worked on front end (80%) and back end (20%)
- Federico Cazzola worked on back end (80%), front end (10%) and documentation (10%)
### Analysis of existing API
To fully prepare on how to properly create an API we watched [this course](https://www.udemy.com/course/nodejs-the-complete-guide/)
because it is one of the most complete courses on NodeJs and has two sections dedicated to REST APIs 
### Learning outcome
- Federico Alterio learned both how to write javascript and 
the overall necessary skills to create and manage a database.
Also, made practice by creating the web server and worked on the
layout of the pages as well. Would like to reinforce his skills
on the API side of the project.

- Federico Cazzola learned how to create and fully document an API. He has also learned how to use SQL in order to manage data from an existing database. He has also acquired the necessary skills to produce effective tasks to test the usability of a web site. Would like to deepen his knoledge on how to create and manage a database.

- Clarence Antichi learned how to properly present a piece of work by documenting it. He also learned how to organize the layout of a website, taking into account general page structure guidelines. He would like to dive down a little bit more on how to create and manage a database.

All three memebers intend on applying what was learned on this
course by creating a startup together. The skills acquired will
also be useful from a general standpoint as they can be applied in
a lot of different contexts.