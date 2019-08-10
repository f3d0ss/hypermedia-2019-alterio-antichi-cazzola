const Joi = require('joi');

module.exports = 
{
    validateBodyFunc: schema => (req, res, next) => 
    {
        const bodyCheck = Joi.validate(req.body, schema);
        if(bodyCheck.error)
            return res.status(400).json(bodyCheck.error);

        // appending to req the body value
        if(!req.value)
            req.value = {}
        req.value.body = bodyCheck.value;
        next();
    },

    schemas: 
    {
        authSchema: Joi.object().keys(
        {
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6).max(16)
        })
      }
}