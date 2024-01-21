import { Router } from "express";
import { getProperties, getFilteredProperties } from "../controllers/properties.js";

const router = Router();

router.get("/", getProperties);
router.get("/search", getFilteredProperties);

export default router;