import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Text,
  Animated,
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import { Bar } from "react-native-progress";
import { useBackHandler } from "@react-native-community/hooks";
import AnimatedNumber from "react-native-animated-number";
import { colors, fonts } from "../../styles/";

const { width, height } = Dimensions.get("window");

export const Preloader = forwardRef((props, ref) => {
  const springValue = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [completedMessage, setCompletedMessage] = useState("");
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useImperativeHandle(ref, () => ({
    show(showProgress) {
      if (show) return;
      setShow(true);
      setShowProgress(showProgress);
      setShowActivityIndicator(!showProgress);
      if (showProgress) {
        setProgress(0.01);
      }
      Animated.spring(springValue, {
        toValue: 1,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    },
    progress(progress) {
      setProgress(progress);
    },
    closeWithMessage(message) {
      return new Promise((resolve, reject) => {
        try {
          setShowProgress(false);
          setShowActivityIndicator(false);
          setProgress(0);
          setCompleted(true);
          setCompletedMessage(message);
          return setTimeout(() => {
            return setTimeout(() => {
              Animated.spring(springValue, {
                toValue: 0,
                tension: 10,
                useNativeDriver: true,
              }).start();
              setShowProgress(false);
              setShowActivityIndicator(false);
              setProgress(0);
              setCompleted(false);
              setCompletedMessage("");
              setShow(false);
              resolve();
              return;
            }, 400);
          }, 1000);
        } catch (err) {
          reject(err);
          return;
        }
      });
    },
    close() {
      return new Promise((resolve, reject) => {
        try {
          return setTimeout(() => {
            Animated.spring(springValue, {
              toValue: 0,
              tension: 10,
              useNativeDriver: true,
            }).start();
            setShowProgress(false);
            setShowActivityIndicator(false);
            setProgress(0);
            setCompleted(false);
            setCompletedMessage("");
            setShow(false);
            resolve();
            return;
          }, 400);
        } catch (err) {
          reject(err);
          return;
        }
      });
    },
  }));

  useBackHandler(() => {
    this.handleHwBackEvent();
  });

  handleHwBackEvent = () => {
    return true;
  };

  renderMessage = () => {
    if (completed == false) return null;
    if (showProgress == true) return null;
    return <Text style={[styles.title]}>{completedMessage}</Text>;
  };

  renderProgressBar = () => {
    if (showProgress == false) return null;
    return (
      <View>
        <Bar progress={progress} width={200} color={colors.loaderColor} />
        {completed ? (
          <Text style={[styles.title, { marginTop: 10 }]}>
            {completedMessage}
          </Text>
        ) : (
          <AnimatedNumber
            style={[styles.title, { marginTop: 10 }]}
            value={progress * 100}
            formatter={(value) => {
              return `${value.toFixed(0)} %`;
            }}
          />
        )}
      </View>
    );
  };

  renderActivityIndicator = () => {
    if (showProgress == true) return null;
    if (showActivityIndicator == false) return null;
    return <ActivityIndicator size={70} color={colors.loaderColor} />;
  };

  const animation = { transform: [{ scale: springValue }] };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.overlay} />
        <Animated.View style={[styles.contentContainer, animation]}>
          <View style={styles.content}>
            {this.renderProgressBar()}
            {this.renderActivityIndicator()}
            {this.renderMessage()}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    // zIndex: 6
  },
  overlay: {
    width: width,
    height: height,
    position: "absolute",
    backgroundColor: colors.overlayColor,
  },
  contentContainer: {
    maxWidth: "80%",
    borderRadius: 5,
    backgroundColor: colors.mainBackgroundColor,
    padding: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: colors.titleColor,
    fontSize: 18,
    textAlign: "center",
  },
});
