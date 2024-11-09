import { useQuery } from "@tanstack/react-query";
import { getAllRides } from "../../apis/queries/get-all-rides";
import { queryKeys } from "./query-keys";

export function useRides(props: { useMock?: boolean } | undefined) {
  const useMock = props?.useMock ?? false;

  return useQuery({
    queryFn: () =>
      getAllRides({
        token: "",
        onUnauthorized: () => {},
        useMock,
      }),
    enabled: true,
    queryKey: queryKeys.getAll,
  });
}
