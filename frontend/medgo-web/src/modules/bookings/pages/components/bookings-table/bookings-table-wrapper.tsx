import { useBookings } from "@/modules/bookings/hooks/queries/use-all-bookings";
import { BookingType } from "@/modules/bookings/schemas/schema";
import { DataTable } from "./bookings-table";
import { columns } from "./columns";

const BookingsTableWrapper = (props: {
  addNewBooking: () => void;
  filters: {
    date_min: string;
    date_max: string;
    booking_type?: BookingType;
    notified?: boolean;
  };
}) => {
  const { data, isLoading, isError } = useBookings({
    // useMock: false,
    filters: props.filters,
  });

  if (isLoading)
    return (
      <div className="max-w-6xl p-6 mx-auto">
        <div>loading data...</div>
      </div>
    );

  if (isError || !data)
    return (
      <div className="max-w-6xl p-6 mx-auto">
        <div>error loading data</div>;
      </div>
    );

  return (
    <div className="w-full px-6 mx-auto">
      <DataTable columns={columns} data={data.items} {...props} />
    </div>
  );
};

export default BookingsTableWrapper;
