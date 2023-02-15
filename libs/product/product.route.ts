import { handleRoute } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import * as controller from "./product.controller";

const router = Router();

router.get("/products", handleRoute(controller.getProducts));

export default router;
