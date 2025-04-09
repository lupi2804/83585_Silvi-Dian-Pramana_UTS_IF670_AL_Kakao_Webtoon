import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const genres = [
  "All", "Action", "Fantasy", "Romance", "Horror", "Drama", "Sci-Fi", "Comedy", "Thriller"
];

const categories = ["All", "Free", "Other", "Popularity"];

const comics = [
  { title: "Demon Slayer", image: require("../assets/image2.png"), genre: "Action", category: "Free" },
  { title: "Solo Leveling", image: require("../assets/image3.png"), genre: "Fantasy", category: "Other" },
  { title: "Bastard", image: require("../assets/image5.png"), genre: "Thriller", category: "Popularity" },
  { title: "Noblesse", image: require("../assets/image6.png"), genre: "Action", category: "Free" },
  { title: "Dokgo", image: require("../assets/image7.png"), genre: "Drama", category: "Other" },
  { title: "The God of High School", image: require("../assets/image8.png"), genre: "Comedy", category: "All" },
  { title: "Omniscient Reader", image: require("../assets/image4.png"), genre: "Sci-Fi", category: "All" },
  { title: "Sweet Home", image: require("../assets/image9.png"), genre: "Horror", category: "Other" },
  { title: "Tower of God", image: require("../assets/image10.png"), genre: "Fantasy", category: "Popularity" },
  { title: "UnOrdinary", image: require("../assets/image11.png"), genre: "Drama", category: "Free" },
  { title: "Dice", image: require("../assets/image12.png"), genre: "Sci-Fi", category: "Other" },
  { title: "I Love Yoo", image: require("../assets/image13.png"), genre: "Romance", category: "Free" },
  { title: "Orange Marmalade", image: require("../assets/image14.png"), genre: "Romance", category: "Popularity" },
  { title: "Girls of the Wilds", image: require("../assets/image15.png"), genre: "Action", category: "All" },
  { title: "Wind Breaker", image: require("../assets/image16.png"), genre: "Sports", category: "Popularity" },
  { title: "Cheese in the Trap", image: require("../assets/image17.png"), genre: "Drama", category: "Other" },
  { title: "Seasons Of Blossom", image: require("../assets/image18.png"), genre: "Romance", category: "All" },
  { title: "My ID is Gangnam Beauty", image: require("../assets/image19.png"), genre: "Romance", category: "Free" },
  { title: "Who Made Me a Princess", image: require("../assets/image20.png"), genre: "Fantasy", category: "Other" },
  { title: "The Remarried Empress", image: require("../assets/image21.png"), genre: "Drama", category: "Popularity" },
  { title: "Your Throne", image: require("../assets/image22.png"), genre: "Thriller", category: "Free" },
];

const banners = [
  { title: "Solo Leveling", image: require("../assets/image.png"), author: "현군, 장성락(REDICE STUDIO)" },
  { title: "Demon Slayer", image: require("../assets/image2.png"), author: "Koyoharu Gotouge" },
  { title: "Tower of God", image: require("../assets/image10.png"), author: "SIU" },
  { title: "My ID is Gangnam Beauty", image: require("../assets/image19.png"), genre: "Romance", category: "Free" },
  { title: "Who Made Me a Princess", image: require("../assets/image20.png"), genre: "Fantasy", category: "Other" },
  { title: "The Remarried Empress", image: require("../assets/image21.png"), genre: "Drama", category: "Popularity" },
  { title: "Your Throne", image: require("../assets/image22.png"), genre: "Thriller", category: "Free" },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const filteredComics = comics.filter((comic) => {
    const matchGenre = activeGenre === "All" || comic.genre === activeGenre;
    const matchCat = activeCategory === "All" || comic.category === activeCategory;
    return matchGenre && matchCat;
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}> <Ionicons name="search" size={24} color="#fff" /> </TouchableOpacity>
        <Image source={require("../assets/kakao.png")} style={{ width: 200, height: 35, resizeMode: "contain" }} />
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}> <MaterialIcons name="menu" size={24} color="#fff" /> </TouchableOpacity>
      </View>

      <View style={{ height: 220 }}>
        <FlatList
          ref={flatListRef}
          data={banners}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({ item }) => (
            <View style={{ width: 380, paddingHorizontal: 16 }}>
              <Image source={item.image} style={{ width: "100%", height: 200, borderRadius: 18 }} />
              <View style={{ position: "absolute", bottom: 20, left: 28 }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ color: "white", fontSize: 12 }}>{item.author}</Text>
              </View>
            </View>
          )}
        />
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          {banners.map((_, index) => (
            <View key={index} style={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 4, backgroundColor: currentIndex === index ? "#fff" : "#444" }} />
          ))}
        </View>
      </View>

      <View style={{ alignItems: "center", backgroundColor: "#111", paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: "#333" }}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: "row", justifyContent: "center" }}>
    {genres.map((tab, index) => (
      <TouchableOpacity 
        key={index} 
        onPress={() => setActiveGenre(tab)} 
        style={{ marginHorizontal: 6, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, backgroundColor: activeGenre === tab ? "#fff" : "#222" }}
      >
        <Text style={{ color: activeGenre === tab ? "#000" : "#fff", fontWeight: activeGenre === tab ? "bold" : "normal", fontSize: 13 }}>
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>

      <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 12, marginTop: 8, paddingHorizontal: 16 }}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={() => setActiveCategory(cat)} style={{ backgroundColor: activeCategory === cat ? "#fff" : "#222", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 }}>
            <Text style={{ color: activeCategory === cat ? "#000" : "#fff" }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 24, paddingHorizontal: 16, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {filteredComics.length > 0 ? (
          filteredComics.map((comic, index) => (
            <View key={index} style={{ marginBottom: 20, width: "48%" }}>
              <Image source={comic.image} style={{ width: "100%", height: 180, borderRadius: 12 }} />
              <Text style={{ color: "white", marginTop: 8, textAlign: "center", fontSize: 14 }}>{comic.title}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>No comics found.</Text>
        )}
      </View>
    </ScrollView>
  );
}
