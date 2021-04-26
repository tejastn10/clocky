import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

const { width } = Dimensions.get("screen");
const SIZE = width * 0.9;

const rotateSeconds = "25deg";
const transfromSeconds = {
  transform: [
    {
      rotate: rotateSeconds,
    },
  ],
};

const rotateMinutes = "125deg";
const transfromMinutes = {
  transform: [
    {
      rotate: rotateMinutes,
    },
  ],
};

const rotateHours = "65deg";
const transfromHours = {
  transform: [
    {
      rotate: rotateHours,
    },
  ],
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={[styles.bigQuadran]} />
      <View style={[styles.mediumQuadran]} />
      <View style={[styles.mover, transfromHours]}>
        <View style={[styles.hours]} />
      </View>
      <View style={[styles.mover, transfromMinutes]}>
        <View style={[styles.minutes]} />
      </View>
      <View style={[styles.mover, transfromSeconds]}>
        <View style={[styles.seconds]} />
      </View>
      <View style={[styles.smallQuadran]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  mover: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: SIZE / 2,
  },
  hours: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "35%",
    marginTop: "15%",
    width: 4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: "45%",
    marginTop: "5%",
    width: 3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: "rgba(227, 71, 134, 1)",
    height: "50%",
    width: 2,
    borderRadius: 2,
  },
  bigQuadran: {
    position: "absolute",
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: "rgba(200, 200, 200, 0.2)",
  },
  mediumQuadran: {
    position: "absolute",
    width: SIZE * 0.5,
    height: SIZE * 0.5,
    borderRadius: SIZE * 0.25,
    backgroundColor: "rgba(200, 200, 200, 0.4)",
  },
  smallQuadran: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(227, 71, 134, 1)",
  },
});
