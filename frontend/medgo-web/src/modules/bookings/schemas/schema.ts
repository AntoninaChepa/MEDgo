import { z } from "zod";

export const bookingSchema = z.object({
  user: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  departure: z.object({
    city: z.string(),
    street: z.string(),
  }),
  city: z.string(),
  arrival: z.object({
    street: z.string(),
  }),
  seat_type: z.string(),
  arrival_time: z.string(),
  pickup_time: z.string(),
});
export type Booking = z.infer<typeof bookingSchema>;
