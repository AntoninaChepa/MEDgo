import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../apis/queries/get-all-bookings";
import { queryKeys } from "./query-keys";

export function useBookings(
  props:
    | {
        useMock?: boolean;
        filters: {
          date_min: string;
          date_max: string;
        };
      }
    | undefined
) {
  const useMock = props?.useMock ?? false;

  return useQuery({
    queryFn: () =>
      getAllBookings({
        token: "",
        onUnauthorized: () => {},
        useMock,
        filters: props?.filters ?? { date_min: "", date_max: "" },
      }),
    enabled:
      props?.filters?.date_min && props?.filters?.date_max ? true : false,
    queryKey: queryKeys.getAll,
  });
}
