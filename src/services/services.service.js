import { ServicesRepository } from "../repositories/services.repository.js";

const servicesRepository = new ServicesRepository();

export class ServicesService {
  async getServices(filters = {}) {
    let result = await servicesRepository.getAll();

    if (filters.category) {
      result = result.filter(
        (service) =>
          service.category.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    if (filters.available) {
      result = result.filter(
        (service) => service.available === (filters.available === "true"),
      );
    }
    
    return result;
  }

  async getServiceById(id) {
    return await servicesRepository.getById(id);
  }

  async createService(serviceData) {
    const services = await servicesRepository.getAll();

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
      throw new Error(
        "Todos los campos del servicio son obligatorios (name, description, duration, price, category)",
      );
    }

    const newId =
      services.length > 0
        ? Math.max(...services.map((service) => service.id)) + 1
        : 1;

    const newService = {
      id: newId,
      name,
      description,
      duration,
      price,
      category,
      available,
    };

    return await servicesRepository.create(newService);
  }

  async updateService(id, updatedData) {
    const service = await servicesRepository.getById(id);

    if (!service) {
      return null;
    }

    const { id: _, ...data } = updatedData;

    return await servicesRepository.update(id, data);
  }

  async deleteService(id) {
    const service = await servicesRepository.getById(id);

    if (!service) {
      return null;
    }

    return await servicesRepository.delete(id);
  }
}
