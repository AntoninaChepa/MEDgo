export const queryKeys = {
  base: ["rides"] as const,
  getAll: ["rides", "get-all"] as const,
  getRideDetails: (rideId: string) => ["rides", "get-details", rideId],
};
