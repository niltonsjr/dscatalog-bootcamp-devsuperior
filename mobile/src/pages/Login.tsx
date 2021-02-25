import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { text, theme } from "../styles";
import { isAuthenticated, login } from "../services/auth";

import eyesOpened from "../assets/eyes-opened.png";
import eyesClosed from "../assets/eyes-closed.png";
import arrow from "../assets/arrow.png";
import { useNavigation } from "@react-navigation/native";

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [userFetchData, setUserFetchData] = useState({});
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  async function handleLogin() {
    const data = await login(userInfo);
    setUserFetchData(data);
    navigation.navigate("Dashboard");
  }

  return (
    <View style={theme.container}>
      <View style={theme.loginCard}>
        <Text style={text.loginTitle}>Login</Text>
        <View style={theme.form}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={theme.textInput}
            value={userInfo.username}
            onChangeText={(e) => {
              const newUserInfo = { ...userInfo };
              newUserInfo.username = e;
              setUserInfo(newUserInfo);
            }}
          />
        </View>
        <View style={theme.passowrdGroup}>
          <TextInput
            placeholder="Senha"
            autoCapitalize="none"
            style={theme.textInput}
            value={userInfo.password}
            onChangeText={(e) => {
              const newUserInfo = { ...userInfo };
              newUserInfo.password = e;
              setUserInfo(newUserInfo);
            }}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={theme.toggle}
          >
            <Image source={hidePassword ? eyesOpened : eyesClosed} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={theme.primaryButton}
          activeOpacity={0.8}
          onPress={() => handleLogin()}
        >
          <View style={theme.textContainer}>
            <Text style={text.primaryText}>Fazer Login</Text>
          </View>
          <View style={theme.arrowContainer}>
            <Image source={arrow} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
