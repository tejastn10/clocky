import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

import dayjs from "dayjs";

const { width } = Dimensions.get("screen");
const SIZE = width * 0.9;
const TICK_INTERVAL = 1000;

export default class App extends React.Component {
  state = {
    index: new Animated.Value(0),
    tick: new Animated.Value(0),
    scales: [...Array(6).keys()].map(() => new Animated.Value(0)),
  };

  _timer: number = 0;
  _ticker: null | NodeJS.Timeout = null;

  componentDidMount(): void {
    const current: dayjs.Dayjs = dayjs();
    const diff: number = current.endOf("day").diff(current, "second");
    const oneDay: number = 24 * 60 * 60;

    this._timer = oneDay - diff;
    this.state.tick.setValue(this._timer);
    this.state.index.setValue(this._timer - 30);

    this._animate();

    this._ticker = setInterval(() => {
      this._timer += 1;
      this.state.tick.setValue(this._timer);
    }, TICK_INTERVAL);
  }

  componentWillUnmount(): void {
    clearInterval(this._ticker!);
    this._ticker = null;
  }

  _animate = (): void => {
    const scaleStaggerAnimations: Animated.CompositeAnimation[] = this.state.scales.map(
      (animated: Animated.Value) =>
        Animated.spring(animated, {
          toValue: 1,
          tension: 18,
          friction: 3,
          useNativeDriver: true,
        })
    );

    Animated.parallel([
      Animated.stagger(
        TICK_INTERVAL / this.state.scales.length,
        scaleStaggerAnimations
      ),
      Animated.timing(this.state.index, {
        toValue: this.state.tick,
        duration: TICK_INTERVAL / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render(): React.ReactNode {
    const {
      index,
      scales: [
        smallQuadranScale,
        mediumQuadranScale,
        bigQuadranScale,
        secondsScale,
        minutesScale,
        hoursScale,
      ],
    } = this.state;
    const interpolated = {
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
    };
    const secondDegrees: Animated.AnimatedMultiplication = Animated.multiply(
      index,
      6
    );

    const transfromSeconds = {
      transform: [
        {
          rotate: secondDegrees.interpolate(interpolated),
        },
        {
          scale: secondsScale,
        },
      ],
    };

    const rotateMinutes: Animated.AnimatedDivision = Animated.divide(
      secondDegrees,
      new Animated.Value(60)
    );
    const transfromMinutes = {
      transform: [
        {
          rotate: rotateMinutes.interpolate(interpolated),
        },
        {
          scale: minutesScale,
        },
      ],
    };

    const rotateHours: Animated.AnimatedDivision = Animated.divide(
      rotateMinutes,
      new Animated.Value(12)
    );
    const transfromHours = {
      transform: [
        {
          rotate: rotateHours.interpolate(interpolated),
        },
        {
          scale: hoursScale,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <StatusBar style="auto" hidden />
        <Animated.View
          style={[
            styles.bigQuadran,
            { transform: [{ scale: bigQuadranScale }] },
          ]}
        />
        <Animated.View
          style={[
            styles.mediumQuadran,
            { transform: [{ scale: mediumQuadranScale }] },
          ]}
        />
        <Animated.View style={[styles.mover, transfromHours]}>
          <View style={[styles.hours]} />
        </Animated.View>
        <Animated.View style={[styles.mover, transfromMinutes]}>
          <View style={[styles.minutes]} />
        </Animated.View>
        <Animated.View style={[styles.mover, transfromSeconds]}>
          <View style={[styles.seconds]} />
        </Animated.View>
        <Animated.View
          style={[
            styles.smallQuadran,
            { transform: [{ scale: smallQuadranScale }] },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
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
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: "35%",
    marginTop: "15%",
    width: 4,
    borderRadius: 4,
  },
  minutes: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: "45%",
    marginTop: "5%",
    width: 3,
    borderRadius: 3,
  },
  seconds: {
    backgroundColor: "rgba(255, 0, 0, 1)",
    height: "50%",
    width: 2,
    borderRadius: 2,
  },
  bigQuadran: {
    position: "absolute",
    width: SIZE * 0.8,
    height: SIZE * 0.8,
    borderRadius: SIZE * 0.4,
    backgroundColor: "rgba(100, 100, 100, 0.8)",
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
    backgroundColor: "rgba(255, 0, 0, 1)",
  },
});
