const express = require("express")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cardsRouter = require('./routers/cards');
const usersRouter = require('./routers/users');

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


app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
})
