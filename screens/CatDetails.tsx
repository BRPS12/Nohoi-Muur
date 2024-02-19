import React, { useEffect, useState } from "react";
import { StackScreenProps } from "../types/navigation";
import { Image, Text, View, StyleSheet, ActivityIndicator } from "react-native";

interface CatDetailsProps extends StackScreenProps<"CatDetails"> {}

export const CatDetails: React.FC<CatDetailsProps> = ({ route }) => {
  const { params } = route;
  const [cat, setCat] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/breeds/${params.catId}`)
      .then((res) => res.json())
      .then((data) => {
        setCat(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching cat details");
        setLoading(false);
      });

    fetch(`https://api.thecatapi.com/v1/images/${params.catImageId}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data?.url);
      })
      .catch((err) => {
        setImage(null);
        setError("Error fetching cat image");
      });
  }, [params.catId, params.catImageId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <Image source={{ uri: image || '' }} style={styles.image} resizeMode="cover" />
        <View style={styles.contentContainer}>
        <Text style={styles.title}>{cat && cat.name}</Text>
        <Text style={styles.detailsText}>Temperament: {cat && cat.temperament}</Text>
        <Text style={styles.detailsText}>Origin: {cat && cat.origin}</Text>
        <Text style={styles.detailsText}>Description: {cat && cat.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 250, 
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Dark text color
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "#666", 
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
  },
  errorText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
