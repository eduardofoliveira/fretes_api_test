import { Router } from "express";

import metricsController from "../controller/metricsController";
import quoteController from "../controller/quoteController";

import { validateQuoteSchema } from "../middleware/validateQuoteSchema";

const rootRoutes = Router();

rootRoutes.post("/quote", validateQuoteSchema, quoteController.handle);
rootRoutes.get("/metrics", metricsController.handle);

export { rootRoutes };
