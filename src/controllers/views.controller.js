import { ServicesService } from "../services/services.service.js";

const servicesService = new ServicesService();

export default class ViewsController {
  async getServicesView(req, res) {
    try {
      const services = await servicesService.getServices();

      res.render("services", { services });
    } catch (error) {
      res.status(500).send("Error al cargar los servicios");
    }
  }

  async getServiceDetailView(req, res) {
    try {
      const { sid } = req.params;

      const service = await servicesService.getServiceById(sid);

      if (!service) {
        return res.status(404).send("Servicio no encontrado");
      }

      res.render("service-detail", { service });
    } catch (error) {
      res.status(500).send("Error al cargar el servicio");
    }
  }
  async getRealtimeServicesView(req, res) {
  try {
    const services = await servicesService.getServices();

    res.render("realtime-services", { services });
  } catch (error) {
    res.status(500).send("Error al cargar los servicios");
  }
}
}