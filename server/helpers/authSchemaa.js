const joi = require("joi");


const authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
});

module.exports = {authSchema}