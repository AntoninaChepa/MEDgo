import { Booking } from "@/modules/bookings/schemas/schema";
import { BookingsOutput } from "../get-all-bookings";

const mockedBookings = [
  {
    user: {
      first_name: "John",
      last_name: "Doe",
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
    seat_type: "idk",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
  {
    user: {
      first_name: "John",
      last_name: "Doe",
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
    seat_type: "idk",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
  {
    user: {
      first_name: "John",
      last_name: "Doe",
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
    seat_type: "idk",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
] satisfies Booking[];

export const getAllBookingsMock = () => {
  return {
    items: mockedBookings,
  } satisfies BookingsOutput;
};
