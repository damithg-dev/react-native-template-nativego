import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Text,
  Animated,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import { Button } from "../button";
import { colors } from "../../styles";
import { useBackHandler } from "@react-native-community/hooks";

const { width, height } = Dimensions.get("window");

const isAndroid = Platform.OS == "android";

export const Alert = forwardRef((props, ref) => {
  const [showSelf, setShowSelf] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(colors.buttonBackgroundColor);
  const [buttonTextColor, setButtonTextColor] = useState(colors.titleColor);
  const [onPressed, setOnPressed] = useState(() => {});
  const [closeOnTouchOutside, setCloseOnTouchOutside] = useState(false);
  const [closeOnHardwareBackPress, setCloseOnHardwareBackPress] = useState(
    false
  );

  const springValue = useRef(new Animated.Value(0)).current;

  useBackHandler(() => {
    this.handleHwBackEvent();
  });

  useImperativeHandle(ref, () => ({
    show(
      title = "",
      message = "",
      buttonText = "",
      onPressed = () => {},
      buttonBackgroundColor = colors.buttonBackgroundColor,
      buttonTextColor = colors.titleColor,
      closeOnTouchOutside = false,
      closeOnHardwareBackPress = false
    ) {
      if (showSelf) return;
      setShowSelf(true);
      setTitle(title);
      setMessage(message);
      setButtonText(buttonText);
      setOnPressed(() => onPressed);
      setButtonBackgroundColor(buttonBackgroundColor);
      setButtonTextColor(buttonTextColor);
      setCloseOnTouchOutside(closeOnTouchOutside);
      setCloseOnHardwareBackPress(closeOnHardwareBackPress);
      Animated.spring(springValue, {
        toValue: 1,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    },
  }));

  springShow = (fromConstructor) => {
    this.toggleAlert(fromConstructor);
    Animated.spring(springValue, {
      toValue: 1,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  };

  springHide = (callBackFunction = () => {}) => {
    if (showSelf === true) {
      Animated.spring(springValue, {
        toValue: 0,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        callBackFunction();
        this.toggleAlert();
      }, 100);
    }
  };

  toggleAlert = (fromConstructor) => {
    if (fromConstructor) {
      setShowSelf(true);
    } else {
      setShowSelf(false);
    }
  };

  handleHwBackEvent = () => {
    if (showSelf && closeOnHardwareBackPress) {
      this.springHide();
      return true;
    } else if (!closeOnHardwareBackPress && showSelf) {
      return true;
    }
    return false;
  };

  onTapOutside = () => {
    if (closeOnTouchOutside) this.springHide();
  };

  renderAlert = () => {
    const animation = {
      transform: [{ scale: springValue }],
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSelf}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.onTapOutside}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.contentContainer, animation]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <Button
              enable={true}
              onPress={() => {
                this.springHide(onPressed);
              }}
              title={buttonText}
            />
          </Animated.View>
        </View>
      </Modal>
    );
  };

  if (showSelf) return this.renderAlert();
  return null;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    // zIndex: 6
  },
  overlay: {
    width: width,
    height: height,
    position: "absolute",
    backgroundColor: colors.overlayColor,
    // zIndex: 6
  },
  contentContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: isAndroid ? 45 : 30,
    backgroundColor:colors.mainBackgroundColor,
    borderRadius: 10,
    overflow: "hidden",
    padding: 20,
  },
  title: {
    fontSize: 25,
    lineHeight: 33,
    letterSpacing: 0,
    textAlign: "left",
    color: colors.titleColor,
    width: "100%",
  },
  message: {
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.descriptionColor,
    width: "100%",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
  },
});

Alert.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  closeOnTouchOutside: PropTypes.bool,
  closeOnHardwareBackPress: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonBackgroundColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  onPressed: PropTypes.func,
};

Alert.defaultProps = {
  show: false,
  title: "",
  message: "",
  closeOnTouchOutside: true,
  closeOnHardwareBackPress: true,
  buttonText: "Okay",
  buttonBackgroundColor: colors.buttonBackgroundColor,
  buttonTextColor: colors.titleColor,
  onPressed: () => {},
};
