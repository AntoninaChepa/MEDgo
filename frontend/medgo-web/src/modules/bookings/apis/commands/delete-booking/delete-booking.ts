import { endpoints } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import {
  DeleteBookingCommand,
  DeleteBookingCommandInput,
} from "./delete-booking.schema";

export async function deleteBooking({
  input,
  token,
  onUnauthorized,
}: {
  input: DeleteBookingCommandInput;
  token: string;
  onUnauthorized: () => void;
}): Promise<void> {
  return fetcher(endpoints.bookings.delete, {
    method: "POST",
    token,
    onUnauthorized,
    input: {
      command: "delete-booking",
      payload: input,
    } satisfies DeleteBookingCommand,
  });
}
