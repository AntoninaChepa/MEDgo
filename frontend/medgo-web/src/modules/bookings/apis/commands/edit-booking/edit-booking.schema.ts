import { z } from "zod";
import { bookingsCommandsListSchema } from "../commands.names";

export const editBookingCommandInputSchema = z.object({
  user: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
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
  arrival: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
  }),
  arrival_time: z.string().optional(),
  seat_type: z.string().optional(),
});
export type EditBookingCommandInput = z.infer<
  typeof editBookingCommandInputSchema
>;

export const editBookingCommandSchema = z.object({
  command: z.literal(bookingsCommandsListSchema.enum["edit-booking"]),
  payload: editBookingCommandInputSchema,
});
export type EditBookingCommand = z.infer<typeof editBookingCommandSchema>;
