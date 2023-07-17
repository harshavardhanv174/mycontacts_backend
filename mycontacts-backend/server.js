const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const port = 5001;
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
    console.log('Server Running on port', port);
});