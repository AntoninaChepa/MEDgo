import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateBookingCommandInput } from "../../apis/commands/create-booking/create-booking.schema";
import { createBooking } from "../../apis/commands/create-booking/create-booking";
import { queryKeys } from "../queries/query-keys";

export function useCreateBooking({ onSettled }: { onSettled: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBookingCommandInput) =>
      createBooking({
        input,
        token: "",
        onUnauthorized: () => {},
      }),
    onMutate: () => {
      toast("Booking creation", {
        description: "Booking creation in progress",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getAll,
      });
      toast("Booking creation", {
        description: "Booking created successfully",
      });
    },
    onError: (error) => {
      toast("Booking creation error", {
        description: error.message,
      });
    },
    onSettled: () => {
      onSettled();
    },
  });
}
