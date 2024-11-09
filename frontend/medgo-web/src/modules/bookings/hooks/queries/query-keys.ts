export const queryKeys = {
  base: ["bookings"] as const,
  getAll: ["bookings", "get-all"] as const,
  getAllWithFilters: (filters: any) =>
    ["bookings", "get-all", "filters", JSON.stringify(filters)] as const,
};
