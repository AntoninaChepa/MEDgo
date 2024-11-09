const data = {
  booking_id: "1",
  booking_type: "scheduled",
  notified: true,
  user: {
    name: "",
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
};

console.log(JSON.stringify(data));