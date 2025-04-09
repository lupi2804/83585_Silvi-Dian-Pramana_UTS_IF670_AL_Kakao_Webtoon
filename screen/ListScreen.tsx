import React, { useState } from "react"; 
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const comicImages = [
  require("../assets/image.png"),
  require("../assets/image2.png"),
  require("../assets/image3.png"),
  require("../assets/image4.png"),
  require("../assets/image5.png"),
  require("../assets/image6.png"),
  require("../assets/image7.png"),
  require("../assets/image8.png"),
  require("../assets/image9.png"),
  require("../assets/image10.png"),
  require("../assets/image11.png"),
  require("../assets/image12.png"),
  require("../assets/image13.png"),
  require("../assets/image14.png"),
  require("../assets/image15.png"),
  require("../assets/image16.png"),
  require("../assets/image17.png"),
  require("../assets/image18.png"),
  require("../assets/image19.png"),
];

const comics = [
  { title: "Demon Slayer", image: comicImages[0], day: "Tuesday", category: "Free", summary: "Tanjiro Kamado joins the Demon Slayer Corps to save his sister from a demon curse." },
  { title: "Solo Leveling", image: comicImages[1], day: "Wednesday", category: "Other", summary: "A weak hunter, Sung Jin-Woo, gets a system that allows him to level up infinitely." },
  { title: "Bastard", image: comicImages[2], day: "Thursday", category: "Popularity", summary: "Jin Seon, a high school student, struggles to escape his serial killer father." },
  { title: "Noblesse", image: comicImages[3], day: "Friday", category: "Free", summary: "Rai, a noble vampire, awakens after 820 years and protects humanity from supernatural threats." },
];

export default function ComicsListScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>
      
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}> 
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={require("../assets/kakao.png")} style={{ width: 200, height: 35, resizeMode: "contain" }} />
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}> 
          <MaterialIcons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Comic List */}
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        {comics.map((comic, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("ComicDetail", { comic })}>
            <View style={{ flexDirection: "row", marginBottom: 16, alignItems: "center" }}>
              <Image source={comic.image} style={{ width: 100, height: 150, borderRadius: 8, marginRight: 12 }} />
              <View>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{comic.title}</Text>
                <Text style={{ color: "gray", fontSize: 14 }}>{comic.day} | {comic.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}
