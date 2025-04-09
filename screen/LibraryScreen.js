import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const LibraryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Latest Read");
  const [editMode, setEditMode] = useState(false);

  const comicData = {
    "Latest Read": [
      { id: "1", title: "The Sea of Hidden Truths", image: require("../assets/image2.png") },
      { id: "2", title: "Mystic Journey", image: require("../assets/image3.png") },
    ],
    "Followed": [
      { id: "3", title: "Chronicles of Eldoria", image: require("../assets/image4.png") },
      { id: "4", title: "Dragon's Awakening", image: require("../assets/image5.png") },
    ],
    "Purchase/Rent": [
      { id: "5", title: "Phantom Shadows", image: require("../assets/image6.png") },
      { id: "6", title: "Galactic Odyssey", image: require("../assets/image7.png") },
    ],
    "Download": [
      { id: "7", title: "Dark Moon Rising", image: require("../assets/image3.png") },
      { id: "8", title: "Celestial Battle", image: require("../assets/image2.png") },
    ],
  };

  // ✅ Menampilkan komik berdasarkan tab yang dipilih
  const comics = comicData[activeTab] || [];

  // Fungsi untuk menghapus komik
  const handleDelete = (id) => {
    Alert.alert("Delete Comic", "Are you sure you want to delete this comic?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedComics = comics.filter((comic) => comic.id !== id);
          comicData[activeTab] = updatedComics;
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="search" size={24} color="white" />
        <Text style={styles.headerTitle}>Library</Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["Latest Read", "Followed", "Purchase/Rent", "Download"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.inactiveTabText}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sort & Edit Buttons */}
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>↕ Sort by Title</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(!editMode)}>
          <Ionicons name={editMode ? "checkmark" : "trash-outline"} size={20} color="white" />
          <Text style={styles.editText}>{editMode ? "Done" : "Edit"}</Text>
        </TouchableOpacity>
      </View>

      {/* Comics List in Grid */}
      <FlatList
        data={comics}
        keyExtractor={(item) => item.id}
        numColumns={2} // Menampilkan 2 kolom dalam 1 baris
        columnWrapperStyle={styles.row} // Memberikan jarak antar kolom
        renderItem={({ item }) => (
          <View style={styles.comicCard}>
            <Image source={item.image} style={styles.comicImage} />
            <Text style={styles.comicTitle}>{item.title}</Text>

            {/* Tombol hapus saat edit mode aktif */}
            {editMode && (
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },

  // Styling untuk tab menu agar berada di tengah
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 8, // Beri jarak antar tab
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  activeTabText: { 
    color: "white", 
    fontWeight: "bold" 
  },
  inactiveTabText: { 
    color: "gray" 
  },

  sortContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    marginBottom: 10 
  },
  sortButton: { 
    backgroundColor: "#222", 
    padding: 8, 
    borderRadius: 5 
  },
  editButton: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#222", 
    padding: 8, 
    borderRadius: 5 
  },
  sortText: { color: "white" },
  editText: { color: "white", marginLeft: 5 },

  // Styling Grid
  row: {
    justifyContent: "space-between", // Memberikan jarak antar komik
    paddingHorizontal: 16,
  },
  comicCard: {
    backgroundColor: "#111",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1, // Membuat lebar fleksibel dalam grid
  },
  comicImage: { 
    width: "100%", // Agar gambar responsif
    height: 220, 
    borderRadius: 10,
    resizeMode: "cover",
  },
  comicTitle: { 
    color: "white", 
    marginTop: 8, 
    fontSize: 14, 
    textAlign: "center" 
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
});

export default LibraryScreen;
