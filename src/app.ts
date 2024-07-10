import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import calculadoraRoutes from "./routes/calculadoraRoutes";
const app: Application = express();
// const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://equipacare-cme.vercel.app/",
  "https://equipacare-cme-git-master-rodrigmeiras-projects.vercel.app/",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

app.use(cors(options));

app.options("/calculadora", cors(options));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/calculadora", calculadoraRoutes);

export default app;
