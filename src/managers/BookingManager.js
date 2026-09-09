import fs from "fs/promises";

export default class BookingManager {
  constructor(path) {
    this.path = path;
  }
  async getBookings(filters = {}) {
    const data = await fs.readFile(this.path, "utf8");
    return JSON.parse(data);
  }
  async createBooking(bookingData) {
    const bookings = await this.getBookings();

    const { clientName, clientEmail, date, time, status } = bookingData;

    if (!clientName || !clientEmail || !date || !time || !status) {
        throw new Error("Todos los campos de la reserva son obligatorios");
    }

    const newId =
        bookings.length > 0
            ? Math.max(...bookings.map((booking) => booking.id)) + 1
            : 1;

    const newBooking = {
        id: newId,
        clientName,
        clientEmail,
        date,
        time,
        status,
        services: []
    };

    bookings.push(newBooking);

    await fs.writeFile(this.path, JSON.stringify(bookings, null, 2));

    return newBooking;
}
async getBookingById(id) {
    const bookings = await this.getBookings();

    return bookings.find(
        (booking) => booking.id === Number(id));
}
async addServiceToBooking(bookingId, serviceId) {
    const bookings = await this.getBookings();

    const booking = bookings.find(
        (booking) => booking.id === Number(bookingId)
    );

    if (!booking) {
        return null;
    }

    const existingService = booking.services.find(
        (item) => item.service === Number(serviceId)
    );

    if (existingService) {
        existingService.quantity += 1;
    } else {
        booking.services.push({
            service: Number(serviceId),
            quantity: 1
        });
    }

    await fs.writeFile(
        this.path,
        JSON.stringify(bookings, null, 2)
    );

    return booking;
}
  }