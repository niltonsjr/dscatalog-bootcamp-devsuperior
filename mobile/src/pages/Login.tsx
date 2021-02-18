import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { text, theme } from "../styles";

import eyesOpened from "../assets/eyes-opened.png";
import eyesClosed from "../assets/eyes-closed.png";
import arrow from "../assets/arrow.png";

const Login: React.FC = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [userInfo, setUserInfo] = useState({ userName: "", password: "" });
  async function handleLogin() {
    console.log("Fazer login");
  }

  return (
    <View style={theme.container}>
      <View style={theme.card}>
        <Text>Login</Text>
        <View style={theme.form}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={text.textInput}
            value={userInfo.userName}
            onChangeText={(e) => {
              const newUserInfo = { ...userInfo };
              newUserInfo.userName = e;
              setUserInfo(newUserInfo);
            }}
          />
        </View>
        <View style={theme.passwordContainer}>
          <TextInput
            placeholder="Senha"
            autoCapitalize="none"
            value={userInfo.passWord}
            onChangeText={(e) => {
              const newUserInfo = { ...userInfo };
              newUserInfo.password = e;
              setUserInfo(newUserInfo);
            }}
            style={text.textInput}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Image
              source={hidePassword ? eyesOpened : eyesClosed}
              style={theme.eyes}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={theme.primaryButton}
          activeOpacity={0.8}
          onPress={() => handleLogin()}
        >
          <View style={theme.buttonTextContainer}>
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
