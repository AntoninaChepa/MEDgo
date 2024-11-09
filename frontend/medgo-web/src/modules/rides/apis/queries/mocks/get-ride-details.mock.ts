import { RideDetails } from "../../../schemas/ride-details.schema";
import { RideDetailsOutput } from "../get-ride-details";

const mockedRideDetails = {
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
  stops: [
    {
      city: "Bozen",
      street: "Piazza Walther",
      arrival_time: "2024-11-09T00:23:23.901Z",
      departure_time: "2024-11-09T00:23:23.901Z",
    },
    {
      city: "Bozen",
      street: "Piazza Walther",
      arrival_time: "2024-11-09T00:23:23.901Z",
      departure_time: "2024-11-09T00:23:23.901Z",
    },
    {
      city: "Bozen",
      street: "Piazza Walther",
      arrival_time: "2024-11-09T00:23:23.901Z",
      departure_time: "2024-11-09T00:23:23.901Z",
    },
  ],
} satisfies RideDetails;

export const getRideDetailsMock = () => {
  return mockedRideDetails satisfies RideDetailsOutput;
};
