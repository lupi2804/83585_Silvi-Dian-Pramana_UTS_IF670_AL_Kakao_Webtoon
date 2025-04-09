import React, { useState } from "react";
import {
  View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image, Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Data komik yang tersedia
  const comics = [
    {
      id: "1",
      title: "Demon Slayer",
      image: require("../assets/image2.png"),
      day: "Tuesday",
      category: "Free",
      summary: "Tanjiro Kamado, seorang pemuda baik hati, menjadi pemburu iblis setelah keluarganya dibantai dan adiknya berubah menjadi iblis.",
    },
    {
      id: "2",
      title: "Solo Leveling",
      image: require("../assets/image3.png"),
      day: "Wednesday",
      category: "Other",
      summary: "Seorang hunter terlemah, Sung Jin-Woo, memperoleh kekuatan luar biasa setelah menyelesaikan dungeon misterius.",
    },
    {
      id: "3",
      title: "Bastard",
      image: require("../assets/image5.png"),
      day: "Thursday",
      category: "Popularity",
      summary: "Jin Seon hidup dalam ketakutan, karena ayahnya ternyata adalah seorang pembunuh berantai.",
    },
    {
      id: "4",
      title: "Noblesse",
      image: require("../assets/image6.png"),
      day: "Friday",
      category: "Free",
      summary: "Cadis Etrama Di Raizel, seorang bangsawan vampir, bangkit setelah tidur panjang dan mencoba memahami dunia modern.",
    },
  ];

  // Fungsi untuk mencari komik berdasarkan kata kunci
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    const results = comics.filter((comic) =>
      comic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
    Keyboard.dismiss();
  };

  // Navigasi ke halaman detail komik yang dipilih
  const handleSelectComic = (comic) => {
    navigation.navigate("ComicDetail", {
      comicId: String(comic.id),
      comicTitle: comic.title,
      comicImage: comic.image,
      comicSummary: comic.summary,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", paddingHorizontal: 16, paddingTop: 10 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Search</Text>
      </View>

      {/* Input Pencarian */}
      <View style={{
        flexDirection: "row", alignItems: "center", backgroundColor: "#1E1E1E",
        borderRadius: 8, paddingHorizontal: 10, marginBottom: 20
      }}>
        <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          style={{ flex: 1, color: "#fff", height: 40 }}
          placeholder="Cari webtoon..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {/* Hasil Pencarian */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectComic(item)} style={{ flexDirection: "row", padding: 12, borderBottomWidth: 1, borderBottomColor: "#333" }}>
            <Image source={item.image} style={{ width: 50, height: 70, borderRadius: 5, marginRight: 10 }} />
            <View>
              <Text style={{ color: "#fff", fontSize: 18 }}>{item.title}</Text>
              <Text style={{ color: "#aaa", fontSize: 14, marginTop: 4 }}>{item.summary}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          searchQuery !== "" && searchResults.length === 0 ? (
            <Text style={{ color: "#aaa", fontSize: 16, textAlign: "center", marginTop: 20 }}>
              Komik tidak ditemukan
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
