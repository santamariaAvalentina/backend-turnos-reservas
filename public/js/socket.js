const socket = io();

socket.on("servicesUpdated", (services) => {
  const container = document.getElementById("services-container");

  container.innerHTML = services
    .map(
      (service) => `
        <article>
          <h2>${service.name}</h2>
          <p>${service.description}</p>
          <p>Duración: ${service.duration} minutos</p>
          <p>Precio: $${service.price}</p>
          <p>Categoría: ${service.category}</p>
          <p>
            ${
              service.available
                ? "Servicio disponible"
                : "Servicio no disponible"
            }
          </p>
        </article>
      `,
    )
    .join("");
});