const Company = require('./models/company');


Company.getCompanies()
    .then(companies => console.log(companies))
    .catch(err => console.log(err));