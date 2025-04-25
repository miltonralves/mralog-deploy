import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionRoutes } from "./session-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveriesLogsRoutes } from "./deliveries-logs-routes";	

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/session", sessionRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/deliveries-logs", deliveriesLogsRoutes);

export { routes };
