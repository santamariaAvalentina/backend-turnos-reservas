import app from './app.js';
import "./config/env.config.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
