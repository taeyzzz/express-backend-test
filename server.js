const express = require("express")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cardsRouter = require('./routers/cards');
const usersRouter = require('./routers/users');
const models = require('./db/models');
const Users = models.Users;
const Cards = models.Cards;


const app = express()

const PORT = process.env.PORT

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/cards", cardsRouter)
app.use("/users", usersRouter)
app.get("/", (req, res) => {
  res.json({
    message: "Server is running"
  })
})

app.post("/test", async (req, res) => {
  const { email, password, firstName, lastName } = req.body
  console.log(email, password, firstName, lastName);
  try {
    const result = await Users.create({
      email,
      password,
      firstName,
      lastName
    })
    const createdResult = result.get()
    console.log(createdResult);
    res.status(201).json({
      data: createdResult
    })
  }
  catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.errors.map(obj => obj.message)
    })
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
})
