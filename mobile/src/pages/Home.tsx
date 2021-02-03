import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Home: React.FC = ({ navigation }) => {
  return (
    <View>
      <Text>Ben vindo al APP</Text>
      <TouchableOpacity
        style={{
          width: 150,
          backgroundColor: "#069",
          padding: 10,
          borderRadius: 4,
        }}
        onPress={() => navigation.navigate("Catalog")}
      >
        <Text>Clique aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
