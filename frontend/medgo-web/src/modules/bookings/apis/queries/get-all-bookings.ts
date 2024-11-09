import { supabaseClient } from "@/pages/_app";
import { z } from "zod";
import { bookingSchema, BookingType } from "../../schemas/schema";

export const BookingsOutputSchema = z.object({
  items: z.array(bookingSchema),
});
export type BookingsOutput = z.infer<typeof BookingsOutputSchema>;

export async function getAllBookings({
  token,
  onUnauthorized,
  useMock,
  filters,
}: {
  token: string;
  onUnauthorized: () => void;
  useMock?: boolean;
  filters: {
    date_min: string;
    date_max: string;
    booking_type?: BookingType;
    notified?: boolean;
  };
}): Promise<BookingsOutput> {
  try {
    // const url = new URL(endpoints.bookings.get_all);

    // url.searchParams.set("date_min", filters.date_min);
    // url.searchParams.set("date_max", filters.date_max);

    // if (filters.booking_type) {
    //   url.searchParams.set("booking_type", filters.booking_type);
    // }

    // if (filters.notified) {
    //   url.searchParams.set("notified", filters.notified.toString());
    // }

    // console.log("#sup: ", { sup: "supabaseClient" });

    // const { data } = await supabaseClient.from("bookings").insert([]);

    // if (!!useMock) {
    //   if (filters.booking_type === "urgent") {
    //     const data = getUrgentBookingsMock();
    //     return BookingsOutputSchema.parse(data);
    //   }

    //   if (filters.booking_type === "scheduled") {
    //     const isToNotify = filters.notified;
    //     const data = getScheduledBookingsMock(!isToNotify);
    //     return BookingsOutputSchema.parse(data);
    //   }
    // }

    // const data = await fetcher(url.href, {
    //   method: "GET",
    //   token,
    //   onUnauthorized,
    // });

    console.log("#supabaseClient: ", { supabaseClient: "supabaseClient" });

    const { data: supabaseData, error: supabaseError } = await supabaseClient
      .from(`bookings`)
      .select();

    // await supabase.from("Bookings").select("id");

    console.log("#supabaseData: ", { supabaseData });

    const data = !!supabaseData
      ? supabaseData
      : {
          items: [],
        };

    return BookingsOutputSchema.parse(data);
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
