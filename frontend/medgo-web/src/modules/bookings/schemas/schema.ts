import { z } from "zod";

export const bookingTypeSchema = z.union([
  z.literal("scheduled"),
  z.literal("urgent"),
]);
export type BookingType = z.infer<typeof bookingTypeSchema>;

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
  seat_type: z.string(),
  arrival_time: z.string(),
  pickup_time: z.string(),
});
export type Booking = z.infer<typeof bookingSchema>;
