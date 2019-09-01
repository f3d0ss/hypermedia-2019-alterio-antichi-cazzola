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
is available [this address](https://github.com/f-cazzola/hypermedia-2019-alterio-antichi-cazzola). We hereby
declare that this is a private repository and, upon request, we will
give access to the instructors.
## Specification
### Web Architecture
Describe here, with a diagram, the components of your web application
and how they interact. Highlight which parts belong to the application
layer, data layer or presentation layer. How did you ensure that HTML is
not rendered server side?
### API
#### REST compliance
_Describe here to what extent did you follow REST principles and what are
the reasons for which you might have decided to diverge. Note, you must
not describe the whole API here, just the design decisions._
We have create complete REST API, we didn't implemented all CRUD operations for each model if not necessary for the web application with exeption for the POST API used by our team to populate the database
#### OpenAPI Resource models
_Describe here synthetically, which models you have introduced for
resources._
- Seminar
- Location
- Performer
- Company
- ArtisticField
- Reservation
- User
### Data model
_Describe with an ER diagram the model used in the data layer of your web
application. How these map to the OpenAPI data model?_
## Implementation
### Tools used
Describe here which tools, languages and frameworks did you use for the
backend of the application.
- express: to simplyfy the creation of a web server and devide routing
- passposrt (with passwport-jwt): to simplify the login and authentication verification process through a JWT
- mysql2: to interact with the MySql server
- bcrypt: to hash the password before save them into the DB
### Discussion
Describe here:
- _How did you make sure your web application adheres to the provided
OpenAPI specification? Which method did you use to test all APIs
endpoints against the expected response?_
- We extensevly tested all the API with the help of swaggerui 
- Why do you think your web application adheres to common practices to
partition a REST-based web application (static assets vs.
application data)
- Describe synthetically why and how did you manage session state,
what are the state change triggering actions (e.g., POST to login
etc..).
- Which technology did you use (relational or a no-SQL database) for
managing the data model?
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