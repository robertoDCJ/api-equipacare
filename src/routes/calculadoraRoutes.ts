import dotenv from "dotenv";
import express from "express";
import { calcular } from "../controllers/calculadoraController";
const router = express.Router();

dotenv.config();

router.post("/calcular-dados", calcular);

export default router;
