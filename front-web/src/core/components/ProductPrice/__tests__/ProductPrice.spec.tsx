import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPrice from "..";

test("Should render ProductPrice", () => {
  const price = 1200;
  render(
    <ProductPrice price={price} />
  );
  //screen.debug();
  const currencyElement = screen.getByText('R$');
  const priceElement = screen.getByText('1,200.00');
  expect(currencyElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});

test("Should render ProductPrice with price equals to zero", () => {
  const price = 0;
  render(
    <ProductPrice price={price} />
  );
  //screen.debug();
  const currencyElement = screen.getByText('R$');
  const priceElement = screen.getByText('0.00');
  expect(currencyElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});

test("Should render ProductPrice with price without thousand separator", () => {
  const price = 100;
  render(
    <ProductPrice price={price} />
  );
  //screen.debug();
  const currencyElement = screen.getByText('R$');
  const priceElement = screen.getByText('100.00');
  expect(currencyElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
});
