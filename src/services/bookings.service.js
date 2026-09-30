import { BookingsRepository } from "../repositories/bookings.repository.js";
import { ServicesRepository } from "../repositories/services.repository.js";

const bookingsRepository = new BookingsRepository();
const servicesRepository = new ServicesRepository();

export class BookingsService {
  async createBooking(bookingData) {
    const { clientName, clientEmail, date, time, status } = bookingData;

    if (!clientName || !clientEmail || !date || !time || !status) {
      throw new Error(
        "Todos los campos de la reserva son obligatorios (clientName, clientEmail, date, time, status)",
      );
    }

    const newBooking = {
      clientName,
      clientEmail,
      date,
      time,
      status,
      services: [],
    };

    return await bookingsRepository.create(newBooking);
  }

  async getBookingById(id) {
    return await bookingsRepository.getById(id);
  }

  async addServiceToBooking(bookingId, serviceId) {
    const booking = await bookingsRepository.getById(bookingId);

    if (!booking) {
      throw new Error("Reserva no encontrada");
    }

    const service = await servicesRepository.getById(serviceId);

    if (!service) {
      throw new Error("Servicio no encontrado");
    }

    const existingService = booking.services.find(
      (item) => item.service.equals(serviceId),
    );

    if (existingService) {
      existingService.quantity += 1;
    } else {
      booking.services.push({
        service: serviceId,
        quantity: 1,
      });
    }

    return await bookingsRepository.update(bookingId, booking);
  }
}
