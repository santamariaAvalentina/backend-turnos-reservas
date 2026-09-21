import express from "express";
import BookingController from "../controllers/bookings.controller.js";
const router = express.Router();

const bookingController = new BookingController();

router.post("/", bookingController.createBooking);

router.get("/:id", bookingController.getBookingById);

router.post("/:bid/services/:sid", bookingController.addServiceToBooking);

export default router;
