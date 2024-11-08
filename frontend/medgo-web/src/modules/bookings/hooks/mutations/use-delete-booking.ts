import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteBookingCommandInput } from "../../apis/commands/delete-booking/delete-booking.schema";
import { deleteBooking } from "../../apis/commands/delete-booking/edit-booking";
import { queryKeys } from "../queries/query-keys";

export function useDeleteBooking({ onSettled }: { onSettled: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DeleteBookingCommandInput) =>
      deleteBooking({
        input,
        token: "",
        onUnauthorized: () => {},
      }),
    onMutate: () => {
      toast("Booking deletion", {
        description: "Booking deletion in progress",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getAll,
      });
      toast("Booking deletion", {
        description: "Booking deleted successfully",
      });
    },
    onError: (error) => {
      toast("Booking deletion error", {
        description: error.message,
      });
    },
    onSettled: () => {
      onSettled();
    },
  });
}
