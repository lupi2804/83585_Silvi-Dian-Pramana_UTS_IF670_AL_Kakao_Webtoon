import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { comicId, comicTitle } = route.params;  // Terima parameter dari navigasi

  console.log("Route Params:", route.params);  // Debugging untuk melihat nilai yang dikirim

  // Simulasi data komik berdasarkan ID
  const comicData = [
    {
      id: 1,
      title: "Demon Slayer",
      image: require("../assets/image2.png"),
      day: "Tuesday",
      category: "Free",
      summary:
        "Tanjiro Kamado, seorang pemuda baik hati, menjadi pemburu iblis setelah keluarganya dibantai dan adiknya berubah menjadi iblis.",
    },
    {
      id: 2,
      title: "Solo Leveling",
      image: require("../assets/image3.png"),
      day: "Wednesday",
      category: "Other",
      summary:
        "Seorang hunter terlemah, Sung Jin-Woo, memperoleh kekuatan luar biasa setelah menyelesaikan dungeon misterius.",
    },
    {
      id: 3,
      title: "Bastard",
      image: require("../assets/image5.png"),
      day: "Thursday",
      category: "Popularity",
      summary: "Jin Seon hidup dalam ketakutan, karena ayahnya ternyata adalah seorang pembunuh berantai.",
    },
    {
      id: 4,
      title: "Noblesse",
      image: require("../assets/image6.png"),
      day: "Friday",
      category: "Free",
      summary: "Cadis Etrama Di Raizel, seorang bangsawan vampir, bangkit setelah tidur panjang dan mencoba memahami dunia modern.",
    },
    {
      id: 5,
      title: "Dokgo",
      image: require("../assets/image7.png"),
      day: "Saturday",
      category: "Other",
      summary: "Seorang pemuda bertekad membalas dendam setelah kakaknya dibully sampai meninggal.",
    },
    {
      id: 6,
      title: "The God of High School",
      image: require("../assets/image8.png"),
      day: "Sunday",
      category: "All",
      summary: "Jin Mori, seorang ahli bela diri, ikut dalam turnamen beladiri yang ternyata menyimpan rahasia besar.",
    },
    {
      id: 7,
      title: "Omniscience Reader",
      image: require("../assets/image4.png"),
      day: "Complete",
      category: "All",
      summary: "Kim Dokja, seorang pembaca novel web, tiba-tiba terjebak dalam dunia novel yang telah ia baca selama bertahun-tahun.",
    },
  ];

  // Cari komik berdasarkan ID (Pastikan perbandingan dengan string)
  const comic = comicData.find((item) => String(item.id) === String(comicId)) || {
    title: comicTitle,
    image: "https://via.placeholder.com/300x400.png?text=No+Image",
    summary: "Ringkasan untuk komik ini belum tersedia.",
  };

  console.log("Found Comic:", comic); // Debugging untuk melihat komik yang ditemukan

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212", paddingHorizontal: 16, paddingTop: 10 }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{comic.title}</Text>
      </View>

      {/* Konten Komik */}
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}>
        {/* Gambar Komik */}
        <Image
          source={typeof comic.image === "string" ? { uri: comic.image } : comic.image} 
          style={{ width: 300, height: 400, borderRadius: 10, marginBottom: 20 }}
          resizeMode="cover"
        />

        {/* Ringkasan Komik */}
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Ringkasan</Text>
        <Text style={{ color: "#aaa", fontSize: 16, textAlign: "center", paddingHorizontal: 20 }}>
          {comic.summary}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
