import { getAllBookings } from "../../apis/queries/get-all-bookings";
import { queryKeys } from "./query-keys";
import { useQuery } from "@tanstack/react-query";

export function useBookings(props: { useMock?: boolean } | undefined) {
  const useMock = props?.useMock ?? false;

  console.log(useMock);

  return useQuery({
    queryFn: () =>
      getAllBookings({
        token: "",
        onUnauthorized: () => {},
        useMock,
      }),
    enabled: true,
    queryKey: queryKeys.getAll,
  });
}
