import path from "path";
import { fileURLToPath } from "url";
import ServiceManager from "../managers/ServiceManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const servicesPath = path.join(__dirname, "../data/services.json");
const serviceManager = new ServiceManager(servicesPath);

export default class ServiceController {
async getServices(req, res) {
    try {
        const services = await serviceManager.getServices(req.query);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los servicios" });
    }
}
async getServiceById(req, res) { 
    const { id } = req.params;
    const service = await serviceManager.getServiceById(id);
    if (!service) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(service);
}
async addService(req, res) {
    try {
        const newService = await serviceManager.addService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async updateService(req, res) {
    const { id } = req.params;
    const updatedService = await serviceManager.updateService(id, req.body);
    if (!updatedService) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json(updatedService);
}
async deleteService(req, res) {
    const { id } = req.params;
    const deletedService = await serviceManager.deleteService(id);
    if (!deletedService) {
        return res.status(404).json({ error: "Servicio no encontrado" });
    }
    res.json({
        message: "Servicio eliminado exitosamente",
        service: deletedService
    });
}
}
 ServiceController;