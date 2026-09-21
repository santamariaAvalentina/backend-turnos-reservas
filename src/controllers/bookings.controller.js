import { BookingsService } from "../services/bookings.service.js";

const bookingsService = new BookingsService();

export default class BookingController {

    async createBooking(req, res) {
        try {
            const newBooking = await bookingsService.createBooking(req.body);

            res.status(201).json(newBooking);

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }

    async getBookingById(req, res) {
        const { id } = req.params;

        const booking = await bookingsService.getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                error: "Reserva no encontrada"
            });
        }

        res.json(booking);
    }

    async addServiceToBooking(req, res) {
        try {
            const { bid, sid } = req.params;

            const updatedBooking =
                await bookingsService.addServiceToBooking(bid, sid);

            res.json(updatedBooking);

        } catch (error) {
            if (error.message === "Reserva no encontrada") {
                return res.status(404).json({
                    error: error.message
                });
            }

            if (error.message === "Servicio no encontrado") {
                return res.status(404).json({
                    error: error.message
                });
            }

            res.status(500).json({
                error: error.message
            });
        }
    }
}