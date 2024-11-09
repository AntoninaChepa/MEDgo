import { z } from "zod";
import { bookingsCommandsListSchema } from "../commands.names";

export const createBookingCommandInputSchema = z.object({
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
  arrival: z.object({
    city: z.string(),
    street: z.string(),
  }),
  arrival_time: z.string(),
  seat_type: z.string(),
});
export type CreateBookingCommandInput = z.infer<
  typeof createBookingCommandInputSchema
>;

export const createBookingCommandSchema = z.object({
  command: z.literal(bookingsCommandsListSchema.enum["create-booking"]),
  payload: createBookingCommandInputSchema,
});
export type CreateBookingCommand = z.infer<typeof createBookingCommandSchema>;
