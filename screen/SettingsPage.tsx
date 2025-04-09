import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../ThemeContext";

// 1. Base Styles (Tanpa Warna)
const baseStyles = {
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  icon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  menuButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 6,
    width: "47%",
  },
  menuButtonText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  sectionBox: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  footer: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
};

// 2. Tema Gelap
const darkStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    header: {
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#111",
    },
    icon: { marginRight: 12 },
    headerTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: "#fff",
    },
    buttonRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginTop: 10,
    },
    menuButton: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginVertical: 6,
      width: "47%",
      backgroundColor: "#1c1c1e",
    },
    menuButtonText: {
      fontSize: 15,
      fontWeight: "600",
      textAlign: "center",
      color: "#f5f5f5",
    },
    sectionBox: {
      paddingHorizontal: 16,
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: "#222",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 6,
      color: "#fff",
    },
    sectionDesc: {
      fontSize: 13,
      lineHeight: 18,
      color: "#aaa",
    },
    optionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      flex: 1,
      marginHorizontal: 4,
      backgroundColor: "#1c1c1e",
    },
    optionText: {
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
      color: "#fff",
    },
    footer: {
      marginVertical: 30,
      paddingHorizontal: 20,
    },
    footerText: {
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
      color: "#777",
    },
  });

// 3. Tema Terang
const lightStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  icon: { marginRight: 12 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  menuButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 6,
    width: "47%",
    backgroundColor: "#eee",
  },
  menuButtonText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
  sectionBox: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#000",
  },
  sectionDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: "#444",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#eee",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#000",
  },
  footer: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: "#555",
  },
});

export default function SettingsPage() {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const styles = theme === "dark" ? darkStyles : lightStyles;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme === "dark" ? "#fff" : "#000"}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
      </View>

      {/* Button Row */}
      <View style={styles.buttonRow}>
        <MenuButton
          label="Isi Ulang Tunai"
          styles={styles}
          onPress={() => navigation.navigate("TopUp")}
      />
        <MenuButton label="Riwayat Cache" styles={styles} />
        <MenuButton label="Detail Tiket" styles={styles} />
        <MenuButton label="Daftar Kupon" styles={styles} />
      </View>


      {/* Sections */}
      <Section
        title="Menunggu Pemberitahuan"
        desc="Tersedia setelah masuk."
        styles={styles}
      />
      <Section title="Berita Saya" desc="Tersedia setelah masuk." styles={styles} />
      <Section
        title="Pengumuman"
        desc={"[Pemberitahuan] Pemeliharaan Sistem Pusat Pelanggan\n20 Maret 2025"}
        styles={styles}
      />

      {/* Gaya Layar */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Gaya Layar</Text>
        <View style={styles.optionRow}>
          <OptionButton emoji="🌙" label="Mode Gelap" styles={styles} />
          <OptionButton emoji="☀️" label="Mode Cahaya" styles={styles} />
        </View>
      </View>

      {/* Preferensi Membaca */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Preferensi Membaca</Text>
        <View style={styles.optionRow}>
          <OptionButton label="Dari Episode Terbaru" styles={styles} />
          <OptionButton label="Dari Episode Pertama" styles={styles} />
        </View>
      </View>

      {/* Kirim Karya */}
      <Section
        title="Kirim Karya Anda"
        desc="Unggah dan bagikan karya Anda."
        styles={styles}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Informasi Bisnis | Ketentuan Penggunaan | Kebijakan Privasi | Pusat Pelanggan | Info Bisnis
        </Text>
        <Text style={[styles.footerText, { marginTop: 6 }]}>
          © KAKAO WEBTOON
        </Text>
      </View>
    </ScrollView>
  );
}

// Komponen tambahan
const MenuButton = ({ label, styles }) => (
  <TouchableOpacity style={styles.menuButton}>
    <Text style={styles.menuButtonText}>{label}</Text>
  </TouchableOpacity>
);

const Section = ({ title, desc, styles }) => (
  <View style={styles.sectionBox}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionDesc}>{desc}</Text>
  </View>
);

const OptionButton = ({ label, emoji = "", styles }) => (
  <TouchableOpacity style={styles.optionButton}>
    <Text style={styles.optionText}>
      {emoji ? `${emoji} ` : ""}
      {label}
    </Text>
  </TouchableOpacity>
);
