import { Router } from "express";
import { createProduct, getProductDetail, getProductList } from "./controller";
import { auth } from "../../middleware/tokenHandler";
const router = Router();

router.post("/", auth, createProduct);

router.get("/list", auth, getProductList);
router.get("/:id", auth, getProductDetail);

module.exports = router;
