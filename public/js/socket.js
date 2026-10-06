const socket = io();

socket.on("servicesUpdated", (services) => {
  console.log("Servicios actualizados:", services);
});