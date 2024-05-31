import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { it } from "vitest";
import React, { useState } from "react";
import Shoes from "./Shoes";
import fetchMock from "jest-fetch-mock";

// Configure fetch mock
fetchMock.enableMocks();

it("should be able to choose shoe size and remove shoes", async () => {
  // Jag gjorde på detta sätt för det sparades inte i arrayen, jag testade testa booking istället men kunde inte lösa det på de sättet så gjorde såhär
  const TestComponent = () => {
    const [shoes, setShoes] = useState([]);

    const updateSize = (e) => {
      const { name, value } = e.target;
      setShoes((prevShoes) =>
        prevShoes.map((shoe) =>
          shoe.id === name ? { ...shoe, size: value } : shoe
        )
      );
    };

    const addShoe = (id) => {
      setShoes((prevShoes) => [...prevShoes, { id, size: "" }]);
    };

    const removeShoe = (id) => {
      setShoes((prevShoes) => prevShoes.filter((shoe) => shoe.id !== id));
    };

    return (
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
    );
  };

  render(<TestComponent />);

  const addShoeButton = screen.getByRole("button", { name: "+" });
  fireEvent.click(addShoeButton);

  await waitFor(() => {
    expect(screen.getByTestId("Shoe size / person 1")).toBeInTheDocument();
  });

  const shoeSizeInput = screen.getByTestId("Shoe size / person 1");
  fireEvent.change(shoeSizeInput, { target: { value: "42" } });

  expect(shoeSizeInput.value).toBe("42");

  const removeShoeButton = screen.getByRole("button", { name: "-" });
  fireEvent.click(removeShoeButton);
});
