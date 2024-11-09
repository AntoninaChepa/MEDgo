import {
  bookingSeatTypeSchema,
  bookingTypeSchema,
} from "@/modules/bookings/schemas/schema";
import { z } from "zod";
import { bookingsCommandsListSchema } from "../commands.names";

export const editBookingCommandInputSchema = z.object({
  booking_id: z.string().optional(),
  booking_type: bookingTypeSchema.optional(),
  notified: z.boolean().optional(),
  user: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  departure: z
    .object({
      city: z.string().optional(),
      street: z.string().optional(),
    })
    .optional(),
  arrival: z
    .object({
      city: z.string().optional(),
      street: z.string().optional(),
    })
    .optional(),
  seat_type: bookingSeatTypeSchema.optional(),
  arrival_time: z.string().optional(),
  pickup_time: z.string().optional(),
});
export type EditBookingCommandInput = z.infer<
  typeof editBookingCommandInputSchema
>;

export const editBookingCommandSchema = z.object({
  command: z.literal(bookingsCommandsListSchema.enum["edit-booking"]),
  payload: editBookingCommandInputSchema,
});
export type EditBookingCommand = z.infer<typeof editBookingCommandSchema>;
