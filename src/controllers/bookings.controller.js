import path from "path";
import { fileURLToPath } from "url";
import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookingsPath = path.join(__dirname, "../data/bookings.json");
const servicesPath = path.join(__dirname, "../data/services.json");

const bookingManager = new BookingManager(bookingsPath);
const serviceManager = new ServiceManager(servicesPath);

export default class BookingController {

    async createBooking(req, res) {
        try {
            const newBooking = await bookingManager.createBooking(req.body);

            res.status(201).json(newBooking);

        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
    async getBookingById(req, res) {
    const { id } = req.params;

    const booking = await bookingManager.getBookingById(id);

    if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
        });
    }

    res.json(booking);
    }
    async addServiceToBooking(req, res) {
        try{
        const { bid, sid } = req.params;
        const booking = await bookingManager.getBookingById(bid);
        if (!booking) {
        return res.status(404).json({
            error: "Reserva no encontrada"
            }); 
        }
        const service = await serviceManager.getServiceById(sid);
        if (!service) {
        return res.status(404).json({
            error: "Servicio no encontrado"
            });
        }
        const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
        res.json(updatedBooking);
        }catch (error) {
        res.status(500).json({
            error: error.message
            });
        }
    }
}