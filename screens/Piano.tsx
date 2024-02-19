import React, { useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";

const notes : any = {
  A: require(`../notes/A5.mp3`),
  AB: require(`../notes/Ab5.mp3`),
  B: require(`../notes/B5.mp3`),
  BB: require(`../notes/Bb5.mp3`),
  C: require(`../notes/C5.mp3`),
  D4: require(`../notes/D4.mp3`),
  D: require(`../notes/D5.mp3`),
  DB: require(`../notes/Db5.mp3`),
  E: require(`../notes/E5.mp3`),
  EB: require(`../notes/Eb5.mp3`),
  F: require(`../notes/F5.mp3`),
  G4: require(`../notes/G4.mp3`),
  G: require(`../notes/G5.mp3`),
};

const PianoKey = ({ note, isBlackKey }: { note: string; isBlackKey: boolean }) => {
  const playNote = async () => {
    await Audio.Sound.createAsync(notes[note], { shouldPlay: true });
  };

  return (
    <TouchableOpacity
      style={[styles.key, isBlackKey ? styles.blackKey : styles.whiteKey]}
      activeOpacity={0.9}
      onPress={playNote}
    >
      {isBlackKey && <View style={styles.blackKeyOverlay} />}
      <Text style={styles.keyText}>{note}</Text>
    </TouchableOpacity>
  );
};

export const Piano = () => {
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true }).then(() => {
      console.log("Play in silent mode active!");
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PianoKey note="C" isBlackKey={false} />
        <PianoKey note="D" isBlackKey={false} />
        <PianoKey note="E" isBlackKey={false} />
        <PianoKey note="F" isBlackKey={false} />
        <PianoKey note="G" isBlackKey={false} />
        <PianoKey note="A" isBlackKey={false} />
        <PianoKey note="B" isBlackKey={false} />
      </View>
      <View style={styles.row}>
        <PianoKey note="DB" isBlackKey={true} />
        <PianoKey note="EB" isBlackKey={true} />
        <PianoKey note="AB" isBlackKey={true} />
        <PianoKey note="BB" isBlackKey={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f0f0f0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  key: {
    flex: 1,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  keyText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  whiteKey: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    height: 80,
  },
  blackKey: {
    backgroundColor: "#333",
    width: "70%",
    height: 50,
    position: "relative",
  },
  blackKeyOverlay: {
    backgroundColor: "#555",
    width: "100%",
    height: "50%",
    position: "absolute",
    zIndex: 1,
    borderRadius: 8,
  },
});


