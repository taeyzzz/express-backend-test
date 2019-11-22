const { check } = require('express-validator')

const registerValidationRule = [
  check("email").exists().trim().isEmail().withMessage("Email is not valid."),
  check("password").exists().trim().isLength({ min: 6 }).withMessage("password is no valid."),
  check("firstName").exists().trim().isLength({ min: 1 }).withMessage("firstName is required."),
  check("lastName").exists().trim().isLength({ min: 1 }).withMessage("lastName is required.")
]

module.exports = {
  registerValidationRule
}
