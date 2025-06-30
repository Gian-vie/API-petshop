const express = require("express");

const authRoute = require("./routes/auth.routes");

const publicRoute = require("./routes/public.routes");

const protectedRoute = require("./routes/protected.routes");

const userRoute = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use("./user", userRoute);

app.use("./auth", authRoute);

app.use("./public", publicRoute);

app.use("./protected", protectedRoute);

module.exports = app;
