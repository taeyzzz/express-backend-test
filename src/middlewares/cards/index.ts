import { Request, Response, NextFunction } from 'express';
import Cards from "../../../db/models"
const Cards = models.Cards

const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Cards.findAll({ include: "user"})
    res.json({
      data: results
    })
  }
  catch (err) {
    next(err)
  }
}

const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const result = await Cards.findOne({
      where: {
        id
      }
    })
    if(!result){
      const err = new Error("Not Found")
      err.statusCode = 404
      throw err
    }
    res.json({
      data: result
    })
  }
  catch (err) {
    next(err)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, status, content, category } = req.body
  try {
    const results = await Cards.create({
      name,
      status,
      content,
      category,
      userId: req.currentUser.id
    })
    res.json({
      data: results
    })
  }
  catch (err) {
    next(err)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { name, status, content, category } = req.body
  const { id } = req.params
  try {
    const selectedCard = await Cards.findOne({
      where: {
        id
      }
    })
    if(!selectedCard){
      const err = new Error("Not Found")
      err.statusCode = 404
      throw err
    }
    const isCardBelongToCurrentUser = selectedCard.get().userId === req.currentUser.id
    if(!isCardBelongToCurrentUser){
      const err = new Error("Bad Request")
      err.statusCode = 400
      throw err
    }
    const updated = await selectedCard.update({
      name: name || selectedCard.get().name,
      status: status || selectedCard.get().status,
      content: content || selectedCard.get().content,
      category: category || selectedCard.get().category
    })
    res.json({
      data: updated
    })
  }
  catch (err) {
    next(err)
  }
}

const _delete = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const selectedCard = await Cards.findOne({
      where: {
        id
      }
    })
    if(!selectedCard){
      const err = new Error("Not Found")
      err.statusCode = 400
      throw err
    }
    const isCardBelongToCurrentUser = selectedCard.get().userId === req.currentUser.id
    if(!isCardBelongToCurrentUser){
      const err = new Error("Bad Request")
      err.statusCode = 400
      throw err
    }
    await selectedCard.destroy()
    res.status(204).send()
  }
  catch (err) {
    next(err)
  }
}

export default {
  index,
  show,
  create,
  update,
  _delete
}
