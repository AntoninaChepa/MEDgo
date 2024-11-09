import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spacer } from "@/components/ui/spacer";
import BookingsTableWrapper from "@/modules/bookings/pages/components/bookings-table/bookings-table-wrapper";
import Layout, { GlobalDateFilters } from "@/modules/layout/layout";
import { useAtom } from "jotai";
import { useState } from "react";
import { AddNewBookingForm } from "./components/add-new-bookings/add-new-bookings-form";
import {
  DeleteBookingConfirmationDialog,
  DeleteBookingConfirmationDialogOpen,
} from "./components/delete-booking-confirmation-dialog/delete-booking-confirmation-dialog";

const BookingsPage = () => {
  const [dateFilters, setDateFilters] = useAtom(GlobalDateFilters);
  const [isModalOpen, setIsModalOpen] = useAtom(
    DeleteBookingConfirmationDialogOpen
  );
  const [addNewBookingOpen, setAddNewBookingOpen] = useState<boolean>(false);

  return (
    <>
      <Sheet open={addNewBookingOpen}>
        <SheetContent
          onClose={() => {
            setAddNewBookingOpen((prev) => !prev);
          }}
        >
          <SheetHeader>
            <SheetTitle>Create a new booking</SheetTitle>
            <SheetDescription>
              Make sure to specify locations, time and seat type
            </SheetDescription>
          </SheetHeader>

          <Spacer size={8} />

          <AddNewBookingForm />
        </SheetContent>

        <Layout>
          <div className="max-w-6xl p-6 mx-auto">
            <BookingsTableWrapper
              addNewBooking={() => {
                setAddNewBookingOpen((prev) => !prev);
              }}
              filters={{
                date_min: dateFilters.date_min ?? new Date().toISOString(),
                date_max: dateFilters.date_max ?? new Date().toISOString(),
              }}
            />
          </div>
        </Layout>
      </Sheet>
      {isModalOpen && (
        <DeleteBookingConfirmationDialog
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default BookingsPage;
