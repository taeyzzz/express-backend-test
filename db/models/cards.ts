import { Model, STRING, INTEGER } from 'sequelize'
import sequelize from './index'
import { Users } from "./users"

export class Cards extends Model {

}

export class CardsModel {
  name: string
  status: string
  content: string
  category: string
  userId: number
}

Cards.init(
  {
    name: STRING,
    status: STRING,
    content: STRING,
    category: STRING,
    userId: INTEGER
  },
  { sequelize, modelName: 'Cards' }
)

Cards.belongsTo(Users, {
  foreignKey: {
    name: "userId",
    allowNull: false
  },
  as: "user"
})
