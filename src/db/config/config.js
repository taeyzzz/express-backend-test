const dev_environment = require("../../../ecosystem.config").apps[0].env
const prod_environment = require("../../../ecosystem.config").apps[0].env_production

const env = {
  "development": {
    "username": dev_environment.DB_USERNAME,
    "password": dev_environment.DB_PASSWORD,
    "database": dev_environment.DB_NAME,
    "host": dev_environment.DB_HOST,
    "dialect": dev_environment.DB_DIALECT,
    "operatorsAliases": dev_environment.DB_OPERATOR_ALIASES
  },
  "test": {
    "username": dev_environment.DB_USERNAME,
    "password": dev_environment.DB_PASSWORD,
    "database": dev_environment.DB_NAME,
    "host": dev_environment.DB_HOST,
    "dialect": dev_environment.DB_DIALECT,
    "operatorsAliases": dev_environment.DB_OPERATOR_ALIASES
  },
  "production": {
    "username": prod_environment.DB_USERNAME,
    "password": prod_environment.DB_PASSWORD,
    "database": prod_environment.DB_NAME,
    "host": prod_environment.DB_HOST,
    "dialect": prod_environment.DB_DIALECT,
    "operatorsAliases": prod_environment.DB_OPERATOR_ALIASES
  }
}

module.exports = env

// const env = {
//   "development": {
//     "username": process.env.DB_USERNAME,
//     "password": process.env.DB_PASSWORD,
//     "database": process.env.DB_NAME,
//     "host": process.env.DB_HOST,
//     "dialect": process.env.DB_DIALECT,
//     "operatorsAliases": process.env.DB_OPERATOR_ALIASES
//   },
//   "test": {
//     "username": process.env.DB_USERNAME,
//     "password": process.env.DB_PASSWORD,
//     "database": process.env.DB_NAME,
//     "host": process.env.DB_HOST,
//     "dialect": process.env.DB_DIALECT,
//     "operatorsAliases": process.env.DB_OPERATOR_ALIASES
//   },
//   "production": {
//     "username": process.env.DB_USERNAME,
//     "password": process.env.DB_PASSWORD,
//     "database": process.env.DB_NAME,
//     "host": process.env.DB_HOST,
//     "dialect": process.env.DB_DIALECT,
//     "operatorsAliases": process.env.DB_OPERATOR_ALIASES
//   }
// }
//
// module.exports = env
