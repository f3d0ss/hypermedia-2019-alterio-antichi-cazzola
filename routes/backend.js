const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/v1/spec.yaml');

const router = express.Router();

router.use('/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.get('/spec.yaml', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'api', 'v1', 'spec.yaml'));
});

module.exports = router;