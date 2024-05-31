import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";
import { it, expect } from "vitest";

const setConfirmation = vi.fn();

it("should toggle menu navigation", () => {
  render(<Navigation setConfirmation={setConfirmation} />);

  expect(screen.getByRole("link", { name: /Booking/i })).toHaveClass("hide");
  fireEvent.click(screen.getByRole("img"));
  expect(screen.getByRole("link", { name: /Booking/i })).not.toHaveClass(
    "hide"
  );

  fireEvent.click(screen.getByRole("img"));
  expect(screen.getByRole("link", { name: /Booking/i })).toHaveClass("hide");

  fireEvent.click(screen.getByRole("img"));

  fireEvent.click(screen.getByRole("link", { name: /Booking/i }));

  expect(setConfirmation).toHaveBeenCalledTimes(1);
  expect(setConfirmation).toHaveBeenCalledWith({});
});
