import fs from "fs/promises";

export default class ServiceManager {
  constructor(path) {
    this.path = path;
  }

  async getServices(filters = {}) {
    try {
      const data = await fs.readFile(this.path, "utf8");
      const services = JSON.parse(data);

      let result = services;

      if (filters.category) {
        result = result.filter(
          (service) => service.category === filters.category,
        );
      }

      if (filters.available) {
        result = result.filter(
          (service) => service.available === (filters.available === "true"),
        );
      }
      return result;
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async getServiceById(id) {
    const services = await this.getServices();
    return services.find((service) => service.id === Number(id));
  }

  async addService(serviceData) {
    const services = await this.getServices();

    const { name, description, duration, price, category, available } =
      serviceData;

    if (
      !name ||
      !description ||
      !duration ||
      !price ||
      !category ||
      available === undefined
    ) {
      throw new Error("Todos los campos del servicio son obligatorios");
    }
    const newId =
    services.length > 0  ? Math.max(...services.map((service) => service.id)) + 1: 1;
    const newService = {
      id: newId,
      name,
      description,
      duration,
      price,
      category,
      available,
    };

    services.push(newService);
    await fs.writeFile(this.path, JSON.stringify(services, null, 2));
    return newService;
  }
  async updateService(id, updatedData) {
    const services = await this.getServices();
    const service = services.find((service) => service.id === Number(id));

    if (!service) {
      return null;
    }

    const { id: _, ...data } = updatedData;

    Object.assign(service, data);

    await fs.writeFile(this.path, JSON.stringify(services, null, 2));

    return service;
  }
  async deleteService(id) {
    const services = await this.getServices();
    const index = services.findIndex((service) => service.id === Number(id));

    if (index === -1) {
      return null;
    }

    const deletedService = services.splice(index, 1)[0];
    await fs.writeFile(this.path, JSON.stringify(services, null, 2));
    return deletedService;
  }
}
