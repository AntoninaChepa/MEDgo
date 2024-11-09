import { endpoints } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import { z } from "zod";
import { bookingSchema } from "../../schemas/schema";
import { getAllBookingsMock } from "./mocks/get-all-bookings.mock";

export const BookingsOutputSchema = z.object({
  items: z.array(bookingSchema),
});
export type BookingsOutput = z.infer<typeof BookingsOutputSchema>;

export async function getAllBookings({
  token,
  onUnauthorized,
  useMock,
}: {
  token: string;
  onUnauthorized: () => void;
  useMock?: boolean;
}): Promise<BookingsOutput> {
  try {
    console.log("# getAllBookings", { key: process.env.BACKEND_API_URL });
    const url = new URL(endpoints.bookings.get_all);
    console.log("# URL ", { url });

    if (!!useMock) {
      const data = getAllBookingsMock();
      console.log("#", { data });

      return BookingsOutputSchema.parse(data);
    }

    const data = await fetcher(url.href, {
      method: "GET",
      token,
      onUnauthorized,
    });

    return BookingsOutputSchema.parse(data);
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
