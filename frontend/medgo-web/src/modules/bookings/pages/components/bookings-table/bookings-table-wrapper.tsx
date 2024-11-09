import { useBookings } from "@/modules/bookings/hooks/queries/use-all-bookings";
import { DataTable } from "./bookings-table";
import { columns } from "./columns";

export default function BookingsTableWrapper(props: {
  addNewBooking: () => void;
}) {
  const { data, isLoading, isError } = useBookings({ useMock: true });

  if (isLoading) return <div>loading...</div>;

  if (isError || !data) return <div>error</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.items} {...props} />
    </div>
  );
}
