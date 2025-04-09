import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "./ThemeContext";

// Import Screens
import WebtoonHomeScreen from "./screen/WebtoonHomeScreen";
import SettingsPage from "./screen/SettingsPage";
import HomeScreen from "./screen/HomeScreen";
import ListScreen from "./screen/ListScreen";
import DetailScreen from "./screen/DetailScreen";
import LoginScreen from "./screen/LoginScreen";
import SignUpScreen from "./screen/SignUpScreen";
import SearchScreen from "./screen/SearchScreen";
import TopUpScreen from "./screen/TopUpScreen";
import LoadingScreen from "./screen/LoadingScreen";
import LibraryScreen from "./screen/LibraryScreen";
import RewardScreen from "./screen/RewardScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// **Bottom Tabs Navigation**
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00B4D8",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "black", paddingBottom: 8, height: 65 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Timetable") iconName = "calendar-outline";
          else if (route.name === "Gift Box") iconName = "gift-outline";
          else if (route.name === "Library") iconName = "book-outline";
          else if (route.name === "Riwayat") iconName = "history";
          else if (route.name === "TopUp") iconName = "cash";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Timetable" component={WebtoonHomeScreen} />
      <Tab.Screen name="Gift Box" component={RewardScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="TopUp" component={TopUpScreen} />
    </Tab.Navigator>
  );
}

// **Main App Navigation**
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // **Check if user is logged in (Persist Login State)**
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(token ? true : false);
    };
    checkLoginStatus();
  }, []);

  // **Handle Logout Function**
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn === null ? (
            <Stack.Screen name="Loading" component={LoadingScreen} />
          ) : isLoggedIn ? (
            <Stack.Screen name="MainTabs">
              {(props) => <BottomTabs {...props} handleLogout={handleLogout} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
              <Stack.Screen name="SignUp">
                {(props) => <SignUpScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
            </>
          )}
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Menu">
            {(props) => <SettingsPage {...props} handleLogout={handleLogout} />}
          </Stack.Screen>
          <Stack.Screen name="ComicsList" component={ListScreen} />
          <Stack.Screen name="ComicDetail" component={DetailScreen} />
          <Stack.Screen name="TopUpScreen" component={TopUpScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
