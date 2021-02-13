const express = require('express')
const app = express()
const connectDatabase = require("./config/databaseconnect")

connectDatabase()

app.use(express.json({extended:true}))
app.use("/api/users", require("./routes/api/users"))
app.use("/api/posts", require("./routes/api/posts"))
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/auth", require("./routes/api/users"))

app.get("/", (req,res) => {
    res.send("API IS RUNNING")

})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {console.log(`Server started on Port ${PORT}`)})