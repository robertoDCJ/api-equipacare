import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import calculadoraRoutes from "./routes/calculadoraRoutes";
const app: Application = express();
// const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3001",
  "https://equipacare-cme.vercel.app",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/calculadora", calculadoraRoutes);

export default app;
