import React, { useEffect, useState } from "react";
import { StackScreenProps } from "../types/navigation";
import { Image, Text, View, StyleSheet, ActivityIndicator } from "react-native";

interface DogDetailsProps extends StackScreenProps<"DogDetails"> {}

export const DogDetails: React.FC<DogDetailsProps> = ({ route }) => {
  const { params } = route;
  const [dog, setDog] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/breeds/${params.dogId}`)
      .then((res) => res.json())
      .then((data) => {
        setDog(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching cat details");
        setLoading(false);
      });

    fetch(`https://api.thedogapi.com/v1/images/${params.dogImageId}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data?.url);
      })
      .catch((err) => {
        setImage(null);
        setError("Error fetching cat image");
      });
  }, [params.dogId, params.dogImageId]);

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
        <Text style={styles.title}>{dog && dog.name}</Text>
        <Text style={styles.detailsText}>Temperament: {dog && dog.temperament}</Text>
        <Text style={styles.detailsText}>Origin: {dog && dog.origin}</Text>
        <Text style={styles.detailsText}>LifeSpan: {dog && dog.life_span}</Text>
        <Text style={styles.detailsText}>Height: {dog && dog.height.metric}</Text>
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
