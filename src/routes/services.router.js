import express from "express";
import ServiceController from "../controllers/ServiceController.js";


const  router = express.Router();
const serviceController = new ServiceController();



router.get("/", serviceController.getServices);

router.post("/", serviceController.addService);

router.get("/:id", serviceController.getServiceById);

router.put("/:id", serviceController.updateService);

router.delete("/:id", serviceController.deleteService);

export default router;




