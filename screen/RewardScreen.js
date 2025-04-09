import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const RewardScreen = ({ navigation }) => { 
  const [activeTab, setActiveTab] = useState("Events"); 
  const tabs = ["Events", "Gift Tickets"];

  // ✅ Data untuk "Events"
  const eventComics = [
    { id: "1", title: "APRIL FOOLS' DAY", image: require("../assets/image2.png"), price: "700" },
    { id: "2", title: "WEEKLY ACTION MISSION", image: require("../assets/image3.png"), price: "400" },
    { id: "3", title: "Holiday Bonus: Get 30 Coins!", image: require("../assets/image4.png"), price: "" },
    { id: "4", title: "New Episode Update! Win 400 Coins!", image: require("../assets/image5.png"), price: "Enjoy" },
    { id: "5", title: "Read for Free Every Hour", image: require("../assets/image6.png"), price: "SET 1" },
    { id: "6", title: "COMEBACK: Stealing Hearts!", image: require("../assets/image7.png"), price: "200" },
  ];

  // ✅ Data untuk "Gift Tickets"
  const giftTickets = [
    { id: "7", title: "Limited Time Gift Ticket", image: require("../assets/image8.png"), price: "1000" },
    { id: "8", title: "Daily Login Bonus", image: require("../assets/image9.png"), price: "500" },
    { id: "9", title: "Special Member Gift", image: require("../assets/image10.png"), price: "800" },
  ];

  // ✅ Pilih data berdasarkan tab aktif
  const displayedData = activeTab === "Events" ? eventComics : giftTickets;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="search" size={24} color="white" />
        <Text style={styles.headerTitle}>Gift Box</Text>
        
        {/* ✅ Tombol Menu Bisa Diklik */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={activeTab === tab ? styles.activeTab : styles.inactiveTab}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.inactiveTabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comics Grid */}
      <FlatList
        data={displayedData} // ✅ Tampilkan data sesuai tab
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.comicCard}>
            <Image source={item.image} style={styles.comicImage} />
            <Text style={styles.comicTitle}>{item.title}</Text>
            {item.price && <Text style={styles.comicPrice}>C {item.price}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1E1E1E",
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  tabContainer: { flexDirection: "row", padding: 16, justifyContent: "center" },
  activeTab: { 
    borderBottomWidth: 3, 
    borderBottomColor: "#FFD700", 
    paddingBottom: 8, 
    marginHorizontal: 16 
  },
  inactiveTab: { marginHorizontal: 16 },
  activeTabText: { color: "#FFD700", fontWeight: "bold", fontSize: 16 },
  inactiveTabText: { color: "gray", fontSize: 16 },
  comicCard: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 10,
    elevation: 4,
  },
  comicImage: { width: 100, height: 150, borderRadius: 8 },
  comicTitle: { color: "white", textAlign: "center", marginTop: 8, fontWeight: "bold" },
  comicPrice: { color: "#FFD700", marginTop: 4, fontWeight: "bold", fontSize: 16 },
});

export default RewardScreen;
