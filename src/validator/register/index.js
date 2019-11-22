const { check } = require('express-validator')

const registerValidationRule = [
  check("email").trim().isEmail().withMessage("Email is not valid."),
  check("password").trim().isLength({ min: 6 }).withMessage("password is no valid."),
  check("firstName").trim().isLength({ min: 1 }).withMessage("firstName is required."),
  check("lastName").trim().isLength({ min: 1 }).withMessage("lastName is required.")
]

module.exports = {
  registerValidationRule
}
