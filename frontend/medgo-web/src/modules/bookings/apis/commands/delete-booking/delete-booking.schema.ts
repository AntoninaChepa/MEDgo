import { z } from "zod";
import { bookingsCommandsListSchema } from "../commands.names";

export const deleteBookingCommandInputSchema = z.object({
  booking_id: z.string(),
});
export type DeleteBookingCommandInput = z.infer<
  typeof deleteBookingCommandInputSchema
>;

export const deleteBookingCommandSchema = z.object({
  command: z.literal(bookingsCommandsListSchema.enum["delete-booking"]),
  payload: deleteBookingCommandInputSchema,
});
export type DeleteBookingCommand = z.infer<typeof deleteBookingCommandSchema>;
