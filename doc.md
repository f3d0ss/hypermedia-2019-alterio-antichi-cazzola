# Documentation of the Backend part
> Deliverable D1
## General group information
| Member n. | Role        | First name | Last Name | Matricola | Email address                   |
| --------- | ----------- | ---------- | --------- | --------- | ------------------------------- |
| 1         | Batman      | Federico   | Cazzola   | 869738    | federico.cazzola@mail.polimi.it |
| 2         | ColourKid   | Clarance   | Antichi   | 872878    | clarence.antichi@mail.polimi.it |
| 3         | WonderWoman | Federico   | Alterio   | 871432    | federico.alterio@mail.polimi.it |
## Links to other deliverables
- Deliverable D0: the web application is accessible at [this
address](http://localhost:3000).
- Deliverable D2: the JSON file containing the specification
of the app API can be found at [this
address](http://localhost:3000/backend/spec.yaml).
- Deliverable D3: the SwaggerUI page of the same API is available at
[this address](http://localhost:3000/backend/swaggerui).
- Deliverable D4: the source code of D0 is available as a zip file at
[this address](http://localhost:3000/backend/app.zip).
- Deliverable D5: the address of the online source control repository
is available [this address](https://github.com/f-cazzola/hypermedia-2019-alterio-antichi-cazzola). We hereby declare that this is a private repository and, upon request, we will give access to the instructors.
## Specification
### Web Architecture
#### Web Architecture Schema 1
![Web Architecture Schema 1](http://localhost:3000/images/doc/web-arc.png)
#### Web Architecture Schema 2
![Web Architecture Schema 2](http://localhost:3000/images/doc/web-arc-2.png)

We render the pages JUST for include piece of html commun in all pages like the navbar or footer. With rendering we avoided any inconsistency with the navbar in all pages.
We are sure the dynamic data is NEVER rendered by the server beacause we never access the model classes anywhere but in the API logic (in the API folder)
### API
#### REST compliance
_Describe here to what extent did you follow REST principles and what are
the reasons for which you might have decided to diverge. Note, you must
not describe the whole API here, just the design decisions._
We have create complete REST API, we didn't implemented all CRUD operations for each model if not necessary for the web application with exeption for the POST API used by our team to populate the database
#### OpenAPI Resource models
_Describe here synthetically, which models you have introduced for
resources._
- Event
- Seminar
- Location
- Performer
- Company
- EventType
- Reservation
- User
### Data model
![ER diagram](http://localhost:3000/images/doc/ER-diagram.png)
All OpenAPI models have also an Entity in the ER diagram except for Reservation, which is represented in the diagram as a reletionship from User to Event
## Implementation
### Tools used
Describe here which tools, languages and frameworks did you use for the
backend of the application.
- express: to simplyfy the creation of a web server and devide routing
- passposrt (with passwport-jwt): to simplify the login and authentication verification process through a JWT
- ejs: just to use the `include` function to avoid for example the need of change every paga for a mistake in the navigation bar (we never render data from the model)
- mysql2: to interact with the MySql server
- bcrypt: to hash the password before save them into the DB
- nodemon: to avoid restarting the server after any change
- nodemailer: to send the email for the email verification (removed the need of verify the email after usability evaluation)
- express-openapi-validator: to validate the input of the API in line with the OpenAPI specification
- swagger-ui-express: to provide the a UI to the OpenAPI specification
### Discussion
Describe here:
- We make sure our web application adheres to the provided OpenAPI specification thanks to SwaggerUi because we generete it from the OpenAPI spec file with swagger-ui-express and we used it to extensevly test all the API
- We think our web application adheres to common practices to partition a REST-based web application because we crated API that are easy to understand and documented with OpenAPI specification, they accept and return only JSON object with the data, so that anyone can create either a web application, Android application or any other sort of application using the same API.
- We managed the authentication with JSON Web Token, returning the JWT when the POST API for login is called. Then this JWT need to be added in the header of the calls to the API that need authentication
- For managing the data model we used MySQL database mainly because we found more documentation about it then other type of relational database
## Other information
### Task assignment
Describe here how development tasks have been subdivided among members
of the group, e.g.:
> - Foo worked on front end (80%) and OpenAPI Spec (20% of the time)
> - Bar worked on ....  
### Analysis of existing API
For almost all API we watch [this course](https://www.udemy.com/course/nodejs-the-complete-guide/)
because it is one of the most complete course on NodeJs and has two section dedicated to REST APIs 
### Learning outcome
What was the most important thing all the members have learned while
developing this part of the project, what questions remained unanswered,
how you will use what you've learned in your everyday life?
6Examples:
- Foo learned to write SQL queries and Javascript but wanted to know
more about caching, he's probably going to create his own startup
with what she has learned
- Bar learned how to deploy on a cloud platform, he would have liked
to know more about promises for asynchronous code..