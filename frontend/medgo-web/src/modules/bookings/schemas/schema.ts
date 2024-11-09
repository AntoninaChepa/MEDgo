import { z } from "zod";

export const bookingTypes = ["scheduled", "urgent"] as const;
export const bookingTypeSchema = z.enum(bookingTypes);
export type BookingType = z.infer<typeof bookingTypeSchema>;

export const bookingSeats = [
  "seated",
  "wheelchair",
  "laying",
  "no_patient",
] as const;
export const bookingSeatTypeSchema = z.enum(bookingSeats);
export type BookingSeatType = z.infer<typeof bookingSeatTypeSchema>;

export const bookingSchema = z.object({
  booking_id: z.string(),
  booking_type: bookingTypeSchema,
  notified: z.boolean(),
  user: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  departure: z.object({
    city: z.string(),
    street: z.string(),
  }),
  arrival: z.object({
    city: z.string(),
    street: z.string(),
  }),
  seat_type: bookingSeatTypeSchema,
  arrival_time: z.string(),
  pickup_time: z.string(),
});
export type Booking = z.infer<typeof bookingSchema>;
