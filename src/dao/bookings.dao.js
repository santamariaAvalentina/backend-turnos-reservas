import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "bookings.json");

export class BookingsDAO {

    async getAll() {
        try {
            const data = await fs.readFile(filePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            if (error.code === "ENOENT") {
                return [];
            }

            throw error;
        }
    }

    async getById(id) {
        const bookings = await this.getAll();

        return bookings.find(
            booking => booking.id === Number(id)
        );
    }

    async create(booking) {
        const bookings = await this.getAll();

        bookings.push(booking);

        await fs.writeFile(
            filePath,
            JSON.stringify(bookings, null, 2)
        );

        return booking;
    }

    async update(id, updatedBooking) {
        const bookings = await this.getAll();

        const index = bookings.findIndex(
            booking => booking.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        bookings[index] = {
            ...bookings[index],
            ...updatedBooking,
            id: Number(id)
        };

        await fs.writeFile(
            filePath,
            JSON.stringify(bookings, null, 2)
        );

        return bookings[index];
    }
}