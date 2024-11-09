import { z } from "zod";

export const rideDetailsSchema = z.object({
  ride_id: z.string(),
  departure: z.object({
    city: z.string(),
    street: z.string(),
  }),
  arrival: z.object({
    city: z.string(),
    street: z.string(),
  }),
  departure_time: z.string(),
  arrival_time: z.string(),
  //
  stops: z.array(
    z.object({
      city: z.string(),
      street: z.string(),
      arrival_time: z.string(),
      departure_time: z.string(),
    })
  ),
});
export type RideDetails = z.infer<typeof rideDetailsSchema>;
