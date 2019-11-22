const bcrypt = require('bcrypt');

const models = require("../../db/models")
const Users = models.Users

exports.register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    const results = await Users.create({
      email,
      passwordHash,
      firstName,
      lastName
    })
    res.json({
      data: results
    })
  }
  catch (err) {
    next(err)
  }
}
