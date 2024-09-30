import express from "express"
import { createPro, deletePro, getPro, updatePro } from "../controllers/product.controller.js";

const router = express.Router()

router.get("/", getPro)
router.post("/", createPro)
router.put("/:id", updatePro)
router.delete("/:id", deletePro)

export default router