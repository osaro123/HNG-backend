require("dotenv").config();
const express = require("express");
const routes = require("./routes/route")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes)

app.get("/", () => console.log(`hello world`))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app