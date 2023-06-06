// import express from "express";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import cors from "cors";
// import db from "./sequelize/models/index.cjs";

const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./models/index.js')

const shopRoutes = require('./routes/shop.routes.js')
const workersRoutes = require('./routes/worker.routes.js')

// import shopRoutes from "./routes/shop.routes.js";

dotenv.config();

const app = express();

const connectDb = async () => {
  const sequelize = db.sequelize
  
  try {
    await sequelize.authenticate()
    console.log("Database connection established");
  } catch (e) {
    console.log("Database connection failed", e);
    process.exit(1);
  }
};

async function main() {
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
  await connectDb()
  
  app.use(cors());
  app.use(express.json());

  app.use("/api/shops", shopRoutes);
  app.use("/api/workers", workersRoutes);

  const PORT = process.env.PORT || 8000;

  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
}

main();
