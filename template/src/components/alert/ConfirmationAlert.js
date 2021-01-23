import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Text,
  Animated,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  Platform,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import { Button } from "../button";
import { colors } from "../../styles";
import { useBackHandler } from "@react-native-community/hooks";
const { width, height } = Dimensions.get("window");

const isAndroid = Platform.OS == "android";

export const ConfirmationAlert = forwardRef((props, ref) => {
  const [showSelf, setShowSelf] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [closeOnTouchOutside, setCloseOnTouchOutside] = useState(false);
  const [closeOnHardwareBackPress, setCloseOnHardwareBackPress] = useState(
    false
  );
  const [cancelText, setCancelText] = useState("No");
  const [confirmText, setConfirmText] = useState("Yes");
  const [onCancelPressed, setOnCancelPressed] = useState(() => {});
  const [onConfirmPressed, setOnConfirmPressed] = useState(() => {});
  const [onDismiss, setOnDismiss] = useState(() => {});

  const springValue = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    show(
      title = "",
      message = "",
      cancelText = "",
      confirmText = "",
      onCancelPressed = () => {},
      onConfirmPressed = () => {},
      onDismiss = () => {},
      closeOnTouchOutside = false,
      closeOnHardwareBackPress = false
    ) {
      if (showSelf) return;
      setShowSelf(true);
      setTitle(title);
      setMessage(message);
      setCloseOnTouchOutside(closeOnTouchOutside);
      setCloseOnHardwareBackPress(closeOnHardwareBackPress);
      setCancelText(cancelText);
      setConfirmText(confirmText);
      setOnCancelPressed(() => onCancelPressed);
      setOnConfirmPressed(() => onConfirmPressed);
      setOnDismiss(() => onDismiss);
      Animated.spring(springValue, {
        toValue: 1,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    },
  }));

  useBackHandler(() => {
    this.handleHwBackEvent();
  });

  springShow = () => {
    this.toggleAlert();
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
        this.toggleAlert();
        callBackFunction();
      }, 100);
    }
  };

  toggleAlert = () => {
    setShowSelf(false);
    onDismiss();
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

  renderTitle = () => {
    if (title.length == 0) return null;
    return <Text style={styles.title}>{title}</Text>;
  };

  renderMessage = () => {
    return <Text style={styles.message}>{message}</Text>;
  };

  renderButton = () => {
    return (
      <View style={styles.action}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => {
              this.springHide(onConfirmPressed);
            }}
          >{confirmText}</Button>
        </View>
        <View
          style={{
            width: 20,
          }}
        />
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => {
              this.springHide(onCancelPressed);
            }}
          >{cancelText}</Button>
        </View>
      </View>
    );
  };

  renderAlert = () => {
    const animation = { transform: [{ scale: springValue }] };
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
            {renderTitle()}
            {renderMessage()}
            {renderButton()}
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
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
  },
  overlay: {
    width: width,
    height: height,
    position: "absolute",
    backgroundColor: colors.overlayColor,
  },
  contentContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: isAndroid ? 20 : 30,
    backgroundColor: colors.mainBackgroundColor,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    zIndex: 59999,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 25,
    lineHeight: 33,
    letterSpacing: 0,
    textAlign: "left",
    color: colors.titleColor,
    width: "100%",
    marginBottom: 15,
  },
  message: {
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: colors.descriptionColor,
    width: "100%",
    fontSize: 18,
    marginBottom: 15,
  },
});

ConfirmationAlert.propTypes = {
  show: PropTypes.bool,
  showProgress: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  closeOnTouchOutside: PropTypes.bool,
  closeOnHardwareBackPress: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  onCancelPressed: PropTypes.func,
  onConfirmPressed: PropTypes.func,
};

ConfirmationAlert.defaultProps = {
  show: false,
  closeOnTouchOutside: false,
  closeOnHardwareBackPress: false,
  showCancelButton: true,
  showConfirmButton: true,
  cancelText: "Cancel",
  confirmText: "Confirm",
  cancelButtonColor:  colors.cancelButtonColor,
  confirmButtonColor: colors.confirmButtonColor,
  customView: null,
};
