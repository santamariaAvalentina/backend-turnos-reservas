export const app = {
    name: 'backend-turnos-reservas',
    version: '1.0.0',
    status: 'initial setup'
};
import ServiceManager from "./managers/ServiceManager.js";

const serviceManager = new ServiceManager();

console.log(serviceManager.getServices());