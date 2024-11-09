"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking } from "@/modules/bookings/schemas/schema";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { useAtom } from "jotai";
import { CheckCircle2Icon, MoreHorizontal, Trash2, X } from "lucide-react";
import {
  DeleteBookingConfirmationDialogOpen,
  SelectedBookingIdToDelete,
} from "../delete-booking-confirmation-dialog/delete-booking-confirmation-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "booking_id",
    header: "ID",
    cell: ({ row }) => {
      return `${row.original.booking_id}`;
    },
  },
  {
    accessorKey: "booking_type",
    header: "Type",
    cell: ({ row }) => {
      switch (row.original.booking_type) {
        case "urgent":
          return <Badge variant="default">{"Urgent"}</Badge>;
          break;

        default:
          return <Badge variant="outline">{"Scheduled"}</Badge>;
          break;
      }
    },
  },
  {
    accessorKey: "departure",
    header: "Departure",
    cell: ({ row }) => {
      return `${row.original.departure.city}, ${row.original.departure.street}`;
    },
  },
  {
    accessorKey: "notified",
    header: "Notified",
    cell: ({ row }) => {
      if (!row.original.notified) return <X className="h-4 w-4" />;

      return <CheckCircle2Icon className="h-4 w-4" />;
    },
  },
  {
    accessorKey: "arrival",
    header: "Arrival",
    cell: ({ row }) => {
      return `${row.original.arrival.city}, ${row.original.arrival.street}`;
    },
  },
  {
    accessorKey: "pickup_time",
    header: "Pickup time",
    cell: ({ row }) => {
      return `${formatDate(new Date(row.original.pickup_time), "dd/MM/yyyy")}`;
    },
  },
  {
    accessorKey: "arrival_time",
    header: "Arrival time",
    cell: ({ row }) => {
      return `${formatDate(new Date(row.original.arrival_time), "dd/MM/yyyy")}`;
    },
  },
  {
    accessorKey: "seat_type",
    header: "Seat type",
    cell: ({ row }) => {
      return `${row.original.seat_type}`;
    },
  },
  {
    accessorKey: "user",
    header: "Customer name",
    cell: ({ row }) => {
      return `${row.original.user.name}`;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return `${row.original.user.phone}`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return `${row.original.user.email}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      const [idToDelete, setIdToDelete] = useAtom(SelectedBookingIdToDelete);
      const [isModalOpen, setIsModalOpen] = useAtom(
        DeleteBookingConfirmationDialogOpen
      );

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="text-red-500 hover:text-red-600"
          >
            <DropdownMenuItem
              onClick={() => {
                setIdToDelete(data.booking_id);
                setIsModalOpen(true);
              }}
              className="text-red-500 hover:text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
