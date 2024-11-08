import { endpoints } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import {
  CreateBookingCommand,
  CreateBookingCommandInput,
} from "./create-booking.schema";

export async function createBooking({
  input,
  token,
  onUnauthorized,
}: {
  input: CreateBookingCommandInput;
  token: string;
  onUnauthorized: () => void;
}): Promise<void> {
  return fetcher(endpoints.bookings.create, {
    method: "POST",
    token,
    onUnauthorized,
    input: {
      command: "create-booking",
      payload: input,
    } satisfies CreateBookingCommand,
  });
}
