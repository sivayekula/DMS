const { body, validationResult, checkExact } = require('express-validator');

const loginSchema = [
    body("email").trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Invalid email address!'),
    body("password").not()
    .isEmpty()
    .isLength({ min: 6, max: 15}).withMessage("Password must be greater than 6 and less than 15")
    .not().isNumeric().not().isAlpha().withMessage("Password must be alphanumeric"),
    checkExact(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
        next();
    }
]

module.exports = loginSchema
