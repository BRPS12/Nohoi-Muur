import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { StackScreenProps } from "../types/navigation";

export const DogScreen = ({ navigation }: StackScreenProps<"DogScreen">) => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setDogs(data);
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
        data={dogs}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("DogDetails", { dogId: item.id , dogImageId: item.reference_image_id})}>
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
