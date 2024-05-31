import { http, HttpResponse } from "msw";

const mockBookingDetails = {
  when: "2024-05-31T11:30",
  lanes: "1",
  people: "1",
  shoes: ["40"],
  price: 220,
  id: "STR5323VDFE",
  active: true,
};

export const handlers = [
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    (req) => {
      console.log("Mock api called with :", req.body);
      return HttpResponse.json(mockBookingDetails, { status: 201 });
    }
  ),
];
