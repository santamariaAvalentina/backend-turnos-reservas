import { BookingsDAO } from "../dao/bookings.dao.js";

const bookingsDAO = new BookingsDAO();

export class BookingsRepository {

    async getAll() {
        return await bookingsDAO.getAll();
    }

    async getById(id) {
        return await bookingsDAO.getById(id);
    }

    async create(booking) {
        return await bookingsDAO.create(booking);
    }

    async update(id, booking) {
        return await bookingsDAO.update(id, booking);
    }
}