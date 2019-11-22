import express, { Application, Request, Response } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import cardsRouter from './src/routers/cards';
import usersRouter from './src/routers/users';
import registerRouter from "./src/routers/register";
import loginRouter from "./src/routers/login";

import usersMiddleWares from "./src/middlewares/users";
import errorHandler from "./src/middlewares/utils/errorHandler";
import "./modules"


const app: Application = express()

const PORT = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/cards", usersMiddleWares.authenticate, cardsRouter)
app.use("/users", usersMiddleWares.authenticate, usersRouter)
app.use("/register", registerRouter)
app.use("/login", loginRouter)

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Server is running"
  })
})
app.use(errorHandler)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found"
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
})
