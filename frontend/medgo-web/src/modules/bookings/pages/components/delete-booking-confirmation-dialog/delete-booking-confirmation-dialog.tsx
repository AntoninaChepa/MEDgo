import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useDeleteBooking } from "@/modules/bookings/hooks/mutations/use-delete-booking";
import { atom, useAtom } from "jotai";

export const SelectedBookingIdToDelete = atom<string | null>(null);
export const DeleteBookingConfirmationDialogOpen = atom<boolean>(false);

type DeleteBookingConfirmationDialogProps = {
  onClose: () => void;
};
export const DeleteBookingConfirmationDialog = (
  props: DeleteBookingConfirmationDialogProps
) => {
  const [idToDelete] = useAtom(SelectedBookingIdToDelete);
  const [isModalOpen] = useAtom(DeleteBookingConfirmationDialogOpen);

  const deleteMutation = useDeleteBooking({
    onSettled: () => {
      props.onClose();
    },
  });

  return (
    <AlertDialog open={isModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            booking and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            onClick={() => {
              if (!!idToDelete) {
                deleteMutation.mutate({ booking_id: idToDelete });
              }
            }}
          >
            {deleteMutation.isPending ? (
              <>
                <LoadingSpinner /> {"Deleting..."}
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
