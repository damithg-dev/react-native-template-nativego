import React from "react";
import {View} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";

export const CustomKeyboardAvoidingView = (props) => {
  let { children, style, refreshControl } = props;
  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll={true}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      enableOnAndroid={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={style}
      extraHeight={-64}
      refreshControl={refreshControl}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

CustomKeyboardAvoidingView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  refreshControl: () => {},
};

CustomKeyboardAvoidingView.defaultProps = {
  children: <View />,
  refreshControl: () => {},
};
