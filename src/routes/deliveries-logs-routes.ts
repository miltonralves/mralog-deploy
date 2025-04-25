import { Router } from "express";
import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesLogsRoutes = Router();
const deliveriesLogsController = new DeliveriesLogsController();

deliveriesLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveriesLogsController.create
);

deliveriesLogsRoutes.get(
  "/:id/show",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveriesLogsController.show
);

export { deliveriesLogsRoutes };
