import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editBooking } from "../../apis/commands/edit-booking/edit-booking";
import { EditBookingCommandInput } from "../../apis/commands/edit-booking/edit-booking.schema";
import { queryKeys } from "../queries/query-keys";

export function useEditBooking({ onSettled }: { onSettled: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: EditBookingCommandInput) =>
      editBooking({
        input,
        token: "",
        onUnauthorized: () => {},
      }),
    onMutate: () => {
      toast("Booking change", {
        description: "Booking change in progress",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getAll,
      });
      toast("Booking change", {
        description: "Booking changed successfully",
      });
    },
    onError: (error) => {
      toast("Booking change error", {
        description: error.message,
      });
    },
    onSettled: () => {
      onSettled();
    },
  });
}
