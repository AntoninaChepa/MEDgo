import { useQuery } from "@tanstack/react-query";
import { getRideDetails } from "../../apis/queries/get-ride-details";
import { queryKeys } from "./query-keys";

export function useRideDetails(
  props: { rideId: string; useMock?: boolean } | undefined
) {
  const useMock = props?.useMock ?? false;
  const { rideId } = props ?? { rideId: "" };

  return useQuery({
    queryFn: () =>
      getRideDetails({
        token: "",
        onUnauthorized: () => {},
        useMock,
      }),
    enabled: !!rideId,
    queryKey: queryKeys.getRideDetails(rideId),
  });
}
