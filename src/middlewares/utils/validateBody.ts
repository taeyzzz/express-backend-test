import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export default (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: { [x: string]: any }[] = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  const err = {
    message: extractedErrors,
    statusCode: 400
  }
  return next(err)
}
