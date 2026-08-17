import {app} from './app.js';
console.log(`Aplicación iniciada: ${app.name} - Version: ${app.version} - Status: ${app.status}`);
console.log(app);

import "./config/env.config.js";
const PORT = process.env.PORT;

console.log(`Servidor configurado en el puerto ${PORT}`);