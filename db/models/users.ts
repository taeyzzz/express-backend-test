'use strict';
import { Model, STRING, Deferrable } from 'sequelize'
import sequelize from './index'
import { Cards } from './cards'

export class Users extends Model {

}

export class UsersModel {
  email: string
  passwordHash: string
  firstName: string
  lastName: string
}

Users.init(
  {
    email: STRING,
    passwordHash: STRING,
    firstName: STRING,
    lastName: STRING
  },
  { sequelize, modelName: 'AppUser' }
)

Users.belongsTo(Cards, {
  foreignKey: {
    name: "userId",
    allowNull: false
  },
  as: "cards"
})
