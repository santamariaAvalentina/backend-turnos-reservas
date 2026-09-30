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

    const { name, description, duration, price, category } =
      serviceData;

    if (
      !name ||
      !description ||
      !duration ||
      !price ||
      !category 
    ) {
      throw new Error(
        "Todos los campos del servicio son obligatorios (name, description, duration, price, category)",
      );
    }
    const newService = {
      name,
      description,
      duration,
      price,
      category,
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
