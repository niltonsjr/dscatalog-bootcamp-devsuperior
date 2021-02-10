import React, { useState } from "react";
import { ProductCard, SearchInput } from "../components";
import productImg from "../assets/produto.png";
import { ScrollView } from "react-native-gesture-handler";
import { theme } from "../styles";

const products = [
  {
    id: 1,
    imgUrl: productImg,
    name: "SmartPhone",
    price: 2279.0,
  },
  {
    id: 2,
    imgUrl: productImg,
    name: "Computador Desktop - Intel Core i7",
    price: 2279.0,
  },
  {
    id: 3,
    imgUrl: productImg,
    name: "Computador Desktop - Intel Core i7",
    price: 2279.0,
  },
  {
    id: 4,
    imgUrl: productImg,
    name: "Computador Desktop - Intel Core i7",
    price: 2279.0,
  },
  {
    id: 5,
    imgUrl: productImg,
    name: "Computador Desktop - Intel Core i7",
    price: 2279.0,
  },
];

const Catalog: React.FC = () => {
  const [search, setSearch] = useState("");

  const data =
    search.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      : products;

  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      <SearchInput placeholder="Nome do produto" search setSearch={setSearch} />
      {data.map((product) => (
        <ProductCard {...product} />
      ))}
    </ScrollView>
  );
};

export default Catalog;
