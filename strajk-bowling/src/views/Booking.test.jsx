import React from "react";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import Booking from "./Booking";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should return mock booking details on successful API call", async () => {
  /*
  const response = await fetch(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ some: "data" }),
    }
  );

  const data = await response.json();

  expect(response.status).toBe(201);
*/

  const response = "hej";

  expect(data).toEqual({
    when: "2024-05-31T11:30",
    lanes: "1",
    people: "1",
    shoes: ["40"],
    price: 220,
    id: "STR5323VDFE",
    active: true,
  });
});

it("should return the correct price and booking number", async () => {
  render(<Booking />);

  fireEvent.change(screen.getByTestId("Date"), {
    target: { value: "2024-05-31" },
  });
  fireEvent.change(screen.getByTestId("Time"), {
    target: { value: "11:30" },
  });
  fireEvent.change(screen.getByTestId("Number of lanes"), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByTestId("Number of awesome bowlers"), {
    target: { value: "1" },
  });

  const addShoeButton = screen.getByRole("button", { name: "+" });
  fireEvent.click(addShoeButton);
  await waitFor(() => {
    expect(screen.getByTestId("Shoe size / person 1")).toBeInTheDocument();
  });

  const shoeSizeInput = screen.getByTestId("Shoe size / person 1");
  fireEvent.change(shoeSizeInput, { target: { value: "40" } });

  const strikeButton = screen.getByRole("button", { name: "strIIIIIike!" });
  fireEvent.click(strikeButton);

  const bookingNumber = await waitFor(
    () => screen.getByTestId("Booking number").value
  );

  const totalPrice = screen.getByRole("article", {
    class: "confirmation__price",
  });

  expect(bookingNumber).toBe("STR5323VDFE");
  expect(totalPrice).toHaveTextContent("Total:220 sek");
});
