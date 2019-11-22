const express = require("express")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cardsRouter = require('./src/routers/cards');
const usersRouter = require('./src/routers/users');
const registerRouter = require("./src/routers/register")
const loginRouter = require("./src/routers/login")

const usersMiddleWares = require("./src/middlewares/users")
const errorHandler = require("./src/middlewares/utils/errorHandler")


const app = express()

const PORT = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/cards", usersMiddleWares.authenticate, cardsRouter)
app.use("/users", usersMiddleWares.authenticate, usersRouter)
app.use("/register", registerRouter)
app.use("/login", loginRouter)

app.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  })
})
app.use(errorHandler)
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found"
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
})
