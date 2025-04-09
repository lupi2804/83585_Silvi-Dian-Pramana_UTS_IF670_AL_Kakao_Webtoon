import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const topUpOptions = [
  { id: "1", amount: "2,360 Cash", price: "9", oldPrice: "59", highlight: true },
  { id: "2", amount: "2,360 Cash", price: "59" },
  { id: "3", amount: "4,760 Cash", price: "119" },
  { id: "4", amount: "7,960 Cash", price: "199" },
  { id: "5", amount: "13,160 Cash", price: "329", popular: true },
  { id: "6", amount: "19,960 Cash", price: "499" },
  { id: "7", amount: "40,000 Cash", price: "1,000" },
];

const TopUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Top Up</Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>0 Cash</Text>
      </View>

      {/* Top-Up Options */}
      <FlatList
        data={topUpOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.topUpItem, item.popular && styles.popularItem]}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.amountText}>{item.amount}</Text>
              {item.highlight && <Text style={styles.promoText}>First-time top-up only ฿9!</Text>}
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                ฿ {item.price} {item.oldPrice && <Text style={styles.oldPrice}> {item.oldPrice}</Text>}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  backText: {
    fontSize: 24,
    color: "#FFF",
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  balanceContainer: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceLabel: {
    color: "#AAA",
    fontSize: 16,
  },
  balanceValue: {
    color: "#FFF",
    fontSize: 16,
  },
  topUpItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  popularItem: {
    borderColor: "red",
    borderWidth: 1,
  },
  itemTextContainer: {
    flexDirection: "column",
  },
  amountText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  promoText: {
    color: "#FFD700",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#C69C6D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#AAA",
    fontSize: 14,
  },
});

export default TopUpScreen;
