import { env } from "./env.mjs";

const API_URL = env.NEXT_PUBLIC_BACKEND_API_URL ?? "";

export const endpoints = {
  bookings: {
    get_all: `${API_URL}/bookings/get-all `,
    create: `${API_URL}/bookings/create`,
    delete: `${API_URL}/bookings/delete`,
    edit: `${API_URL}/bookings/edit`,
  },
  rides: {
    get_all: `${API_URL}/rides/get-all`,
    get_details: `${API_URL}/rides/get-details`,
  },
  auth: {
    sign_in: `${API_URL}/auth/sign-in`,
    sign_out: `${API_URL}/auth/sign-out`,
    refresh_token: `${API_URL}/auth/refresh-token`,
  },
};
