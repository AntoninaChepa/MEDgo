import { Booking } from "@/modules/bookings/schemas/schema";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useBookings } from "@/modules/bookings/hooks/queries/use-all-bookings";

export default function TablePage() {
  // const data = await getData();
  const { data, isLoading, isError } = useBookings({ useMock: true });

  if (isLoading) return <div>loading...</div>;

  if (isError || !data) return <div>error</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.items} />
    </div>
  );
}
