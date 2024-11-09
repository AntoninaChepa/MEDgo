import { endpoints } from "@/lib/endpoints";
import { fetcher } from "@/lib/fetcher";
import { z } from "zod";
import { rideDetailsSchema } from "../../schemas/ride-details.schema";
import { getRideDetailsMock } from "./mocks/get-ride-details.mock";

export const RideDetailsOutputSchema = rideDetailsSchema;
export type RideDetailsOutput = z.infer<typeof RideDetailsOutputSchema>;

export async function getRideDetails({
  token,
  onUnauthorized,
  useMock,
}: {
  token: string;
  onUnauthorized: () => void;
  useMock?: boolean;
}): Promise<RideDetailsOutput> {
  try {
    const url = new URL(endpoints.rides.get_details);

    if (!!useMock) {
      const data = getRideDetailsMock();
      return RideDetailsOutputSchema.parse(data);
    }

    const data = await fetcher(url.href, {
      method: "GET",
      token,
      onUnauthorized,
    });

    return RideDetailsOutputSchema.parse(data);
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
