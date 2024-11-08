import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../apis/queries/get-all-bookings";
import { queryKeys } from "./query-keys";

export function useBookings() {
  return useQuery({
    queryFn: () =>
      getAllBookings({
        token: "",
        onUnauthorized: () => {},
      }),
    enabled: true,
    queryKey: queryKeys.getAll,
  });
}
