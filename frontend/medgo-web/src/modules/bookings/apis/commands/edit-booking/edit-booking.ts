import { supabaseClient } from "@/pages/_app";
import { v4 } from "uuid";
import { EditBookingCommandInput } from "./edit-booking.schema";

export async function editBooking({
  input,
  token,
  onUnauthorized,
}: {
  input: EditBookingCommandInput;
  token: string;
  onUnauthorized: () => void;
}): Promise<void> {
  const { data, error } = await supabaseClient.from("bookings").upsert({
    id: input.booking_id ?? v4(),
    data: JSON.stringify(input),
  });

  return;

  // return fetcher(endpoints.bookings.edit, {
  //   method: "POST",
  //   token,
  //   onUnauthorized,
  //   input: {
  //     command: "edit-booking",
  //     payload: input,
  //   } satisfies EditBookingCommand,
  // });
}
