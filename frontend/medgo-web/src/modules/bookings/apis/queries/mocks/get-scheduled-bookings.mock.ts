import { Booking } from "@/modules/bookings/schemas/schema";
import { BookingsOutput } from "../get-all-bookings";

const mockedBookingsScheduled = [
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
    seat_type: "seated",
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
    seat_type: "seated",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
  {
    booking_id: "3",
    booking_type: "scheduled",
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
    seat_type: "seated",
    arrival_time: "2024-11-09T00:23:23.901Z",
    pickup_time: "2024-11-09T00:23:23.901Z",
  },
] satisfies Booking[];
// const mockedBookingsUrgent = [];

export const getScheduledBookingsMock = (isToNotify = false) => {
  if (isToNotify)
    return {
      items: mockedBookingsScheduled.filter((a) => a.notified === false),
    } satisfies BookingsOutput;

  return {
    items: mockedBookingsScheduled,
  } satisfies BookingsOutput;
};
