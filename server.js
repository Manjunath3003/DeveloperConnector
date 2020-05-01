const express = require("express");
const connectDB = require("./config/db");

const app = express();
// connect DataBase
connectDB();

//Init Middleware // middleware is a function that executes during request to the express server
app.use(express.json({ extended: false })); // bodyparser which helps to get data from req.body

app.get("/", (req, res) => res.send("API Running"));

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
