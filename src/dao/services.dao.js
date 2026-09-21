import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "services.json");

export class ServicesDAO {

    async getAll() {
        try {
            const data = await fs.readFile(filePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            if (error.code === "ENOENT") {
            return [];
            }

            throw error;
        }
    }

    async getById(id) {
        const services = await this.getAll();
        return services.find(service => service.id === Number(id));
    }

    async create(service) {
        const services = await this.getAll();
        services.push(service);

        await fs.writeFile(
            filePath,
            JSON.stringify(services, null, 2)
        );

        return service;
    }

    async update(id, updatedService) {
        const services = await this.getAll();
        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        services[index] = {
            ...services[index],
            ...updatedService,
            id: Number(id)
        };

        await fs.writeFile(
            filePath,
            JSON.stringify(services, null, 2)
        );

        return services[index];
    }

    async delete(id) {
        const services = await this.getAll();
        const index = services.findIndex(
            service => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        const deletedService = services.splice(index, 1)[0];

        await fs.writeFile(
            filePath,
            JSON.stringify(services, null, 2)
        );

        return deletedService;
    }
}