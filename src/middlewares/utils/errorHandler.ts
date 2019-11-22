import { Request, Response, NextFunction,  } from "express";
export default (err: { statusCode: number; message: any; }, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  if(!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).json({
    message: err.message
  })
}
