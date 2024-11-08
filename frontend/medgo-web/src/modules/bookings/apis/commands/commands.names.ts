import { z } from "zod";

const bookingsCommandsList = [
  "create-booking",
  "edit-booking",
  "delete-booking",
] as const;

export const bookingsCommandsListSchema = z.enum(bookingsCommandsList);
