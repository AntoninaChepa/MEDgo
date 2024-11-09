import { supabaseClient } from "@/pages/_app";
import { CreateBookingCommandInput } from "./create-booking.schema";

export async function createBooking({
  input,
  token,
  onUnauthorized,
}: {
  input: CreateBookingCommandInput;
  token: string;
  onUnauthorized: () => void;
}): Promise<void> {
  const { data, error } = await supabaseClient
    .from("bookings")
    .upsert({
      id: Math.floor(Math.random() * 10001),
      data: JSON.stringify(input),
    })
    .select();

  console.log("## ", { data, error });

  return;

  // return fetcher(endpoints.bookings.create, {
  //   method: "POST",
  //   token,
  //   onUnauthorized,
  //   input: {
  //     command: "create-booking",
  //     payload: input,
  //   } satisfies CreateBookingCommand,
  // });
}
