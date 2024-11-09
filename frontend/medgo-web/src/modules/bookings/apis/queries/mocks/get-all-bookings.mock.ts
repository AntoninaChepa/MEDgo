import { Booking } from "@/modules/bookings/schemas/schema";
import { BookingsOutput } from "../get-all-bookings";

const mockedBookings = [
  {
    booking_id: "1",
    booking_type: "scheduled",
    notified: true,
    user: {
      name: "John Doe",
      email: "john@doe.com",
      phone: "+1234567890",
    },
    departure: {
      city: "Meran",
      street: "Piazza Walther",
    },
    arrival: {
      city: "Bozen",
      street: "Piazza Walther",
    },
    seat_type: "standard",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
  {
    booking_id: "2",
    booking_type: "scheduled",
    notified: true,
    user: {
      name: "John Doe",
      email: "john@doe.com",
      phone: "+1234567890",
    },
    departure: {
      city: "Meran",
      street: "Piazza Walther",
    },
    arrival: {
      city: "Bozen",
      street: "Piazza Walther",
    },
    seat_type: "standard",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
  {
    booking_id: "3",
    booking_type: "urgent",
    notified: false,
    user: {
      name: "John Doe",
      email: "john@doe.com",
      phone: "+1234567890",
    },
    departure: {
      city: "Meran",
      street: "Piazza Walther",
    },
    arrival: {
      city: "Bozen",
      street: "Piazza Walther",
    },
    seat_type: "standard",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
] satisfies Booking[];

export const getAllBookingsMock = () => {
  return {
    items: mockedBookings,
  } satisfies BookingsOutput;
};
