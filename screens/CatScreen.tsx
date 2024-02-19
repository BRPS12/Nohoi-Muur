import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { StackScreenProps } from "../types/navigation";

export const CatScreen = ({ navigation }: StackScreenProps<"CatScreen">) => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setCats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cat breeds:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={cats}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("CatDetails", { catId: item.id , catImageId: item.reference_image_id})}>
              <Text style={styles.text}>{item.name}</Text>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    color: "black",
  },
});
