import { z } from "zod";
import { createBookingCommandSchema } from "./create-booking/create-booking.schema";

export const bookingsCommands = z.discriminatedUnion("command", [
  createBookingCommandSchema,
]);
