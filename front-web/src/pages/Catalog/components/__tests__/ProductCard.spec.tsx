import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { Product } from "core/types/Product";

test("Should render ProductCard", () => {
  const product = {
    name: "computador",
    imgUrl: "image.jpg",
    price: 40,
  } as Product;

  render(<ProductCard product={product} />);
  //screen.debug();
  expect(screen.getByText('computador')).toBeInTheDocument();
  expect(screen.getByAltText('computador')).toBeInTheDocument();
  expect(screen.getByText('R$')).toBeInTheDocument();
  expect(screen.getByText('40.00')).toBeInTheDocument();
});
