import services from "../data/services.json" with { type: "json" };
export default class ServiceManager {
    getServices() {
    return services;
    }
    getServiceById(id) {
    return services.find(service => service.id === id);
    }
    addService(serviceData) {
    const { name, description, duration, price, category, available } = serviceData;

    if (!name || !description || !duration || !price || !category || available === undefined) {
        throw new Error("Todos los campos del servicio son obligatorios");
    }

    const newService = {
        id: services.length + 1,
        name,
        description,
        duration,
        price,
        category,
        available
    };

    services.push(newService);

    return newService;
    }
    updateService(id, updatedData) {
    const service = services.find(service => service.id === id);

    if (!service) {
        return null;
    }

    const { id: _, ...data } = updatedData;

    Object.assign(service, data);

    return service;
    }
    deleteService(id) {
    const index = services.findIndex(service => service.id === id);

    if (index === -1) {
        return null;
    }

    return services.splice(index, 1)[0];
    }
}