import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spacer } from "@/components/ui/spacer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout, { GlobalDateFilters } from "@/modules/layout/layout";
import { useAtom } from "jotai";
import { useState } from "react";
import { AddNewBookingForm } from "./components/add-new-bookings/add-new-bookings-form";
import BookingsTableWrapper from "./components/bookings-table/bookings-table-wrapper";
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

  type BookingsPageTab =
    | "all"
    | "scheduled_confirmed"
    | "scheduled_to_notify"
    | "urgent";
  const [activeTab, setActiveTab] = useState<BookingsPageTab>(
    "scheduled_confirmed"
  );

  const clickableTabsOpts = [
    {
      id: "all",
      label: "All bookings",
    },
    {
      id: "scheduled_confirmed",
      label: "Scheduled",
    },
    {
      id: "scheduled_to_notify",
      label: "Scheduled (to notify)",
    },
    {
      id: "urgent",
      label: "Urgent",
    },
  ];

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
          <Tabs defaultValue={activeTab} className="w-full">
            {/* tabs */}
            <div className="px-6 pt-7 pb-0">
              <TabsList>
                {clickableTabsOpts.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id as BookingsPageTab}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* content */}
            <TabsContent value={"all" satisfies BookingsPageTab}>
              <BookingsTableWrapper
                addNewBooking={() => {
                  setAddNewBookingOpen((prev) => !prev);
                }}
                filters={{
                  date_min: dateFilters.date_min ?? new Date().toISOString(),
                  date_max: dateFilters.date_max ?? new Date().toISOString(),
                }}
              />
            </TabsContent>
            <TabsContent
              value={"scheduled_confirmed" satisfies BookingsPageTab}
            >
              <BookingsTableWrapper
                addNewBooking={() => {
                  setAddNewBookingOpen((prev) => !prev);
                }}
                filters={{
                  date_min: dateFilters.date_min ?? new Date().toISOString(),
                  date_max: dateFilters.date_max ?? new Date().toISOString(),
                  booking_type: "scheduled",
                  notified: true,
                }}
              />
            </TabsContent>
            <TabsContent
              value={"scheduled_to_notify" satisfies BookingsPageTab}
            >
              <BookingsTableWrapper
                addNewBooking={() => {
                  setAddNewBookingOpen((prev) => !prev);
                }}
                filters={{
                  date_min: dateFilters.date_min ?? new Date().toISOString(),
                  date_max: dateFilters.date_max ?? new Date().toISOString(),
                  booking_type: "scheduled",
                  notified: false,
                }}
              />
            </TabsContent>
            <TabsContent value={"urgent" satisfies BookingsPageTab}>
              <BookingsTableWrapper
                addNewBooking={() => {
                  setAddNewBookingOpen((prev) => !prev);
                }}
                filters={{
                  date_min: dateFilters.date_min ?? new Date().toISOString(),
                  date_max: dateFilters.date_max ?? new Date().toISOString(),
                  booking_type: "urgent",
                }}
              />
            </TabsContent>
          </Tabs>
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
