const express = require("express");

const authRoutes = require("./routes/auth.routes");
const petRoutes = require("./routes/pet.routes");
const adoptionRoutes = require("./routes/adoption.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/adoptions', adoptionRoutes);

module.exports = app;
