import { ServiceModel } from "./models/service.model.js";
export class ServicesDAO {

    async getAll() {
        return await ServiceModel.find();
    }

    async getById(id) {
        return await ServiceModel.findById(id);
    }

    async create(service) {
        const newService = await ServiceModel.create(service);
        return newService;
    }

    async update(id, updatedService) {
        return await ServiceModel.findByIdAndUpdate(
            id,
            updatedService,
            { new: true }
        );
    }

   async delete(id) {
        return await ServiceModel.findByIdAndDelete(id);
    }
}