const { check } = require('express-validator')

const createCardValidationRule = [
  check("name").trim().isLength({ min: 1 }).withMessage("name is required."),
  check("status").trim().isLength({ min: 1 }).withMessage("status is required."),
  check("content").trim().isLength({ min: 1 }).withMessage("content is required."),
  check("category").trim().isLength({ min: 1 }).withMessage("category is required.")
]

module.exports = {
  createCardValidationRule
}
