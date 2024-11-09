import { endpoints } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import { z } from "zod";
import { bookingSchema } from "../../schemas/schema";

export const BookingsOutputSchema = z.object({
  items: z.array(bookingSchema),
});
export type BookingsOutput = z.infer<typeof BookingsOutputSchema>;

export async function getAllBookings({
  token,
  onUnauthorized,
}: {
  token: string;
  onUnauthorized: () => void;
}): Promise<BookingsOutput> {
  try {
    const url = new URL(endpoints.bookings.get_all);

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
