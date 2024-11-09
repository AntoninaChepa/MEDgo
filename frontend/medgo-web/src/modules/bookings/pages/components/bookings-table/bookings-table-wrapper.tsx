import { useBookings } from "@/modules/bookings/hooks/queries/use-all-bookings";
import { DataTable } from "./bookings-table";
import { columns } from "./columns";

const BookingsTableWrapper = (props: {
  addNewBooking: () => void;
  filters: { date_min: string; date_max: string };
}) => {
  const { data, isLoading, isError } = useBookings({
    useMock: true,
    filters: props.filters,
  });

  if (isLoading) return <div>loading data...</div>;

  if (isError || !data) return <div>error loading data</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.items} {...props} />
    </div>
  );
};

export default BookingsTableWrapper;
