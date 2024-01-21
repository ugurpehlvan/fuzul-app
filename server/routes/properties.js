import { Router } from "express";
import { getProperties } from "../controllers/properties.js";

const router = Router();

router.get("/", getProperties);

export default router;