import { supabaseClient } from "@/pages/_app";
import { DeleteBookingCommandInput } from "./delete-booking.schema";

export async function deleteBooking({
  input,
  token,
  onUnauthorized,
}: {
  input: DeleteBookingCommandInput;
  token: string;
  onUnauthorized: () => void;
}): Promise<void> {
  const { data, error } = await supabaseClient
    .from("bookings")
    .delete()
    .eq("id", input.booking_id);

  return;

  // return fetcher(endpoints.bookings.delete, {
  //   method: "POST",
  //   token,
  //   onUnauthorized,
  //   input: {
  //     command: "delete-booking",
  //     payload: input,
  //   } satisfies DeleteBookingCommand,
  // });
}
