import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import BookingInfo from "./BookingInfo";

it("should book date, time, amount of bowlers and lanes", () => {
  const updateBookingDetails = () => {};

  render(<BookingInfo updateBookingDetails={updateBookingDetails} />);

  const dateInput = screen.getByTestId("Date");
  const timeInput = screen.getByTestId("Time");
  const amountInput = screen.getByTestId("Number of awesome bowlers");
  const lanesInput = screen.getByTestId("Number of lanes");

  fireEvent.change(dateInput, { target: { value: "2024-05-31" } });
  fireEvent.change(timeInput, { target: { value: "12:00" } });
  fireEvent.change(amountInput, { target: { value: "1" } });
  fireEvent.change(lanesInput, { target: { value: "1" } });

  expect(dateInput.value).toBe("2024-05-31");
  expect(timeInput.value).toBe("12:00");
  expect(amountInput.value).toBe("1");
  expect(lanesInput.value).toBe("1");
});
