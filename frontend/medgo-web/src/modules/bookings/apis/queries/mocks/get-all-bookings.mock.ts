import { Booking } from "@/modules/bookings/schemas/schema";
import { BookingsOutput } from "../get-all-bookings";

const mockedBookings = [
  {
    user: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    departure: {
      city: "",
      street: "",
    },
    arrival: {
      city: "",
      street: "",
    },
    seat_type: "",
    arrival_time: "",
    pickup_time: "",
  },
  {
    user: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    departure: {
      city: "",
      street: "",
    },
    arrival: {
      city: "",
      street: "",
    },
    seat_type: "",
    arrival_time: "",
    pickup_time: "",
  },
] satisfies Booking[];

export const getAllBookingsMock = () => {
  return {
    items: mockedBookings,
  } satisfies BookingsOutput;
};
