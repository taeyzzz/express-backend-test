const { check } = require('express-validator')

const createCardValidationRule = [
  check("name").exists().trim().isLength({ min: 1 }).withMessage("name is required."),
  check("status").exists().trim().isLength({ min: 1 }).withMessage("status is required."),
  check("content").exists().trim().isLength({ min: 1 }).withMessage("content is required."),
  check("category").exists().trim().isLength({ min: 1 }).withMessage("category is required.")
]

module.exports = {
  createCardValidationRule
}
