const Company = require('../../../models/company');

exports.getCompanies = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const comapnies = await Company.getCompanies(pageNumber, pageSize);
        res.status(200).json(comapnies);
    } catch (error) {
        next(error);
    }
}

exports.getCompanyById = async (req, res, next) => {
    const companyId = req.params.companyId;
    try {
        const company = await Company.getCompanyById(companyId);
        res.status(200).json(company);
    } catch (error) {
        next(error);
    }
}

exports.postCompany = async (req, res, next) => {
    const name = req.body.name;
    const detail = req.body.detail;
    const photos = req.body.photos;

    try {
        const company = new Company(name, detail, photos);
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        next(error);
    }
}