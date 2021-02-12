import React, { useState, useEffect } from "react";
import { ProductCard, SearchInput } from "../components";
import { ScrollView } from "react-native-gesture-handler";
import { theme } from "../styles";
import { api } from "../services";
import { ActivityIndicator } from "react-native";

const Catalog: React.FC = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fillProducts() {
    setLoading(true);
    const res = await api.get(
      `/products?page=0&linesPerPage=12&direction=ASC&orderBy=name`
    );
    setProducts(res.data.content);
    setLoading(false);
  }

  useEffect(() => {
    fillProducts();
  }, []);

  const data =
    search.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      : products;

  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      <SearchInput placeholder="Nome do produto" search={search} setSearch={setSearch} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        data.map((product) => <ProductCard {...product} key={product.id} />)
      )}
    </ScrollView>
  );
};

export default Catalog;
