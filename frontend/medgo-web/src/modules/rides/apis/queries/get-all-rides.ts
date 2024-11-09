import { endpoints } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import { z } from "zod";
import { rideSchema } from "../../schemas/ride.schema";
import { getAllRidesMock } from "./mocks/get-all-rides.mock";

export const RidesOutputSchema = z.object({
  items: z.array(rideSchema),
});
export type RidesOutput = z.infer<typeof RidesOutputSchema>;

export async function getAllRides({
  token,
  onUnauthorized,
  useMock,
}: {
  token: string;
  onUnauthorized: () => void;
  useMock?: boolean;
}): Promise<RidesOutput> {
  try {
    const url = new URL(endpoints.rides.get_all);

    if (!!useMock) {
      const data = getAllRidesMock();
      return RidesOutputSchema.parse(data);
    }

    const data = await fetcher(url.href, {
      method: "GET",
      token,
      onUnauthorized,
    });

    return RidesOutputSchema.parse(data);
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
