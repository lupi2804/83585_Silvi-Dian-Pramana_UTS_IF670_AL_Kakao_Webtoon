import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";

// Complete Expo web browser session
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google OAuth
  const [requestGoogle, responseGoogle, promptGoogle] = Google.useAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID",
  });

  // Facebook OAuth
  const [requestFacebook, responseFacebook, promptFacebook] =
    Facebook.useAuthRequest({
      clientId: "YOUR_FACEBOOK_CLIENT_ID",
    });

  // **Manual Login**
  const handleLogin = async () => {
    if (email === "test@example.com" && password === "123456") {
      await AsyncStorage.setItem("userToken", "dummy-token");
      navigation.replace("MainTabs");
    } else {
      Alert.alert("Login Failed", "Incorrect email or password!");
    }
  };

  // **Google Login**
  const handleGoogleLogin = async () => {
    promptGoogle();
    if (responseGoogle?.type === "success") {
      await AsyncStorage.setItem("userToken", "google-token");
      navigation.replace("MainTabs");
    } else {
      Alert.alert("Login Failed", "Google login failed!");
    }
  };

  // **Facebook Login**
  const handleFacebookLogin = async () => {
    promptFacebook();
    if (responseFacebook?.type === "success") {
      await AsyncStorage.setItem("userToken", "facebook-token");
      navigation.replace("MainTabs");
    } else {
      Alert.alert("Login Failed", "Facebook login failed!");
    }
  };

  // **Kakao Login (Simulated)**
  const handleKakaoLogin = async () => {
    Alert.alert("Kakao Login", "Kakao login feature is not available yet!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign in with</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.facebookButton}
        onPress={handleFacebookLogin}
      >
        <Text style={styles.buttonText}>Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Text style={styles.buttonText}>Kakao</Text>
      </TouchableOpacity>
    </View>
  );
};

// **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: { fontSize: 24, color: "#fff", marginBottom: 20 },
  input: {
    width: "80%",
    backgroundColor: "#222",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  facebookButton: {
    backgroundColor: "#4267B2",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    padding: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { color: "#FFD700", marginTop: 10 },
  orText: { color: "#fff", marginTop: 20, fontSize: 16 },
});

export default LoginScreen;
