import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

import models from "../../../db/models";
const Users = models.Users

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Users.findAll({ include: "cards" })
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
    const result = await Users.findOne({
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

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName } = req.body
  const { id } = req.params
  try {
    const selectedUser = await Users.findOne({
      where: {
        id
      }
    })
    if(!selectedUser){
      const err = new Error("Not Found")
      err.statusCode = 400
      throw err
    }
    const isTargetIsCurrentUser = selectedUser.get().id === req.currentUser.id
    if(!isTargetIsCurrentUser){
      const err = new Error("Bad Request")
      err.statusCode = 400
      throw err
    }
    const updated = await selectedUser.update({
      firstName, lastName
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
    const selectedUser = await Users.findOne({
      where: {
        id
      }
    })
    if(!selectedUser){
      const err = new Error("Not Found")
      err.statusCode = 400
      throw err
    }
    await selectedUser.destroy()
    res.status(204).send()
  }
  catch (err) {
    next(err)
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token")
    res.status(204).send()
  }
  catch (err) {
    next(err)
  }
}

const getSession = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  try {
    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    const user = await Users.findOne({
      where: {
        id: decoded.id
      }
    })
    res.json({
      data: user
    })
  }
  catch (err) {
    next(err)
  }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    if(!token) {
      const err = new Error("Unauthorized")
      err.statusCode = 401
      throw err
    }
    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    const result = await Users.findOne({
      where: {
        id: decoded.id
      }
    })
    const user = result.get()
    req.currentUser = user
    next()
  }
  catch (err) {
    next(err)
  }
}

export default {
  index,
  show,
  update,
  _delete,
  logout,
  getSession,
  authenticate,
}
