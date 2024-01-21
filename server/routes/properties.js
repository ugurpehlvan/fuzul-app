const { Router } = require("express");
const { getProperties, getFilteredProperties } = require("../controllers/properties.js");

const router = Router();

router.get("/", getProperties);
router.get("/search", getFilteredProperties);

module.exports = router;