import { endpoints } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import {
  EditBookingCommand,
  EditBookingCommandInput,
} from "./edit-booking.schema";

export async function editBooking({
  input,
  token,
  onUnauthorized,
}: {
  input: EditBookingCommandInput;
  token: string;
  onUnauthorized: () => void;
}): Promise<void> {
  return fetcher(endpoints.bookings.edit, {
    method: "POST",
    token,
    onUnauthorized,
    input: {
      command: "edit-booking",
      payload: input,
    } satisfies EditBookingCommand,
  });
}
