import { Router } from "express";

import ViewsController from "../controllers/views.controller.js";

const router = Router();

const viewsController = new ViewsController();

router.get("/services", (req, res) => {
  viewsController.getServicesView(req, res);
});

router.get("/services/:sid", (req, res) => {
  viewsController.getServiceDetailView(req, res);
});

router.get("/bookings/:bid", (req, res) => {
  viewsController.getBookingDetailView(req, res);
});

router.get("/realtime-services", (req, res) => {
  viewsController.getRealtimeServicesView(req, res);
});

export default router;