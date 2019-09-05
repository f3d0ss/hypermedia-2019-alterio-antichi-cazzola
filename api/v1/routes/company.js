const express = require('express');
const router = express.Router();

const companyController = require('../controller/company');

router.get('/', companyController.getCompanies);

router.post('/', companyController.postCompany);

router.get('/event/:eventId', companyController.getCompaniesByEvent);

router.get('/:companyId', companyController.getCompanyById);

module.exports = router;