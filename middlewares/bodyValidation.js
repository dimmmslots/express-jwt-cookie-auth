const joi = require('joi');
const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('admin', 'user')
});

function bodyValidation(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: error.details[0].message
        })
    }
    next();
}

module.exports = bodyValidation;