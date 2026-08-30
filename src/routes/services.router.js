import express from "express";
import ServiceManager from "../managers/ServiceManager.js";

const  router = express.Router();
const serviceManager = new ServiceManager();


router.get("/", (req, res) => {
    const services = serviceManager.getServices(req.query);
    res.status(200).json(services);
});

router.post("/", (req, res) => {
    try {
        const newService = serviceManager.addService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ 
            status: "error", 
            message : error.message 
        });
    }
});

router.get("/:sid", (req, res) => {
    const {sid} = req.params;
    const id = Number(sid);
    const service = serviceManager.getServiceById(id);
    if (!service) {
        return res.status(404).json({ 
            status: "error", 
            message : "Servicio no encontrado" 
        });
    }
    res.status(200).json(service);
});

router.put("/:sid", (req, res) => {
    const {sid} =req.params;
    const id = Number(sid);
    const updatedService = serviceManager.updateService(id, req.body);
    if (!updatedService) {
        return res.status(404).json({ 
            status: "error", 
            message : "Servicio no encontrado" 
        });
    }
    res.status(200).json(updatedService);
});

router.delete("/:sid", (req, res) => {
    const {sid} = req.params;
    const id = Number(sid);
    const deletedService = serviceManager.deleteService(id);
    if (!deletedService) {
        return res.status(404).json({ 
            status: "error", 
            message : "Servicio no encontrado" 
        });
    }
    res.status(200).json(deletedService);
});

export default router;
