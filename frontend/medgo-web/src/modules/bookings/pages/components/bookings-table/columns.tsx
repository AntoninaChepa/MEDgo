"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Booking } from "@/modules/bookings/schemas/schema";
import { ColumnDef } from "@tanstack/react-table";
import { useAtom } from "jotai";
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DeleteBookingConfirmationDialogOpen,
  SelectedBookingIdToDelete,
} from "../delete-booking-confirmation-dialog/delete-booking-confirmation-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "arrival",
    header: "Arrival",
    cell: ({ row }) => {
      return `${row.original.arrival.city}, ${row.original.arrival.street}`;
    },
  },
  {
    accessorKey: "arrival_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Arrival time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
    accessorKey: "pickup_time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pickup time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "seat_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Seat type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return `${row.original.user.first_name} ${row.original.user.last_name}`;
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
