import { Ride } from "../../../schemas/ride.schema";
import { RidesOutput } from "../get-all-rides";

const mockedRides = [
  {
    ride_id: "1",
    departure: {
      city: "Meran",
      street: "Piazza Walther",
    },
    arrival: {
      city: "Bozen",
      street: "Piazza Walther",
    },
    departure_time: "2024-11-09T00:23:23.901Z",
    arrival_time: "2024-11-09T00:23:23.901Z",
  },
  {
    ride_id: "2",
    departure: {
      city: "Meran",
      street: "Piazza Walther",
    },
    arrival: {
      city: "Bozen",
      street: "Piazza Walther",
    },
    departure_time: "2024-11-09T00:23:23.901Z",
    arrival_time: "2024-11-09T00:23:23.901Z",
  },
] satisfies Ride[];

export const getAllRidesMock = () => {
  return {
    items: mockedRides,
  } satisfies RidesOutput;
};
