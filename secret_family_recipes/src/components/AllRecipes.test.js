import React from "react";
import { render, waitFor } from "@testing-library/react";
import Allrecipes from "./Allrecipes";
import { fetchApi as mockFetch } from "./fetchApi";

jest.mock("./fetchApi");
const testData = {
  data: [
    {
      id: 1,
      title: "Baked Denver Omelet",
      source: "Grandpa Hector",
      image_url:
        "https://github.com/Secret-Family-Recipes-2-BW/SFR2-Backend/blob/master/images/baked-denver-omelet.jpg?raw=true",
      private: 0,
    },
    {
      id: 2,
      title: "Fluffy Pancakes",
      source: "Auntie Tina",
      image_url:
        "https://github.com/Secret-Family-Recipes-2-BW/SFR2-Backend/blob/master/images/fluffy-pancakes.jpg?raw=true",
      private: 0,
    },
  ],
};

test("Fetches data and renders recipes", async () => {
  // Finish this test
  mockFetch.mockResolvedValueOnce(testData);
  const { debug, getByText } = render(<Allrecipes />);
  await waitFor(() => {
    debug();
    expect(getByText(/Baked Denver Omelet/i)).toBeInTheDocument();
  });
});
