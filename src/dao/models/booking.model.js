import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true },

    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'services',
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1
        }
      }
    ]
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model('bookings', bookingSchema);