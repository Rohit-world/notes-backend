const express = require('express')
const app = express()
const port = 3000
const cors=require("cors")

app.use(cors({
  origin:"*",

}))


const{DBconnection}=require("./config/db")
const {NoteRoute}=require("./route/notes.route")
const {UserRoute}=require("./route/user.route")
app.use(express.json())


app.get('/', (req, res) => res.send('Hello World!'))
app.use("/user",UserRoute)
app.use("/notes",NoteRoute)

app.listen(port, async() =>{ 

    try {
     await DBconnection
     console.log("Connected successfully ")
      } catch (error) {
        console.log(error)
      }
console.log(`Example app listening on port ${port}!`)
})