import React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {colors, fonts} from '../../styles';
import {LoadingIndicator, LoadingIndicatorTypes} from '../preloader';
import PropTypes from 'prop-types';

export const Button = (props) => {
  let {
    children,
    onPress,
    enable,
    loading,
    style,
    textStyle,
    enableBackgroundColor,
    disableBackgroundColor,
    enableTextColor,
    disableTextColor,
  } = props;

  const backgroundColor = enable
    ? enableBackgroundColor
    : disableBackgroundColor;

  if (loading) {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor: backgroundColor,
            shadowColor: backgroundColor,
          },
          style,
        ]}>
        <LoadingIndicator type={LoadingIndicatorTypes.activity} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      disabled={!enable}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: enable
            ? enableBackgroundColor
            : disableBackgroundColor,
          shadowColor: '#000',
        },
        style,
      ]}>
      <Text
        style={[
          styles.buttonTitle,
          {
            color: enable ? enableTextColor : disableTextColor,
          },
          textStyle,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonTitle: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 28,
  },
  buttonContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
  },
});

Button.propTypes = {
  children: PropTypes.string,
  enableBackgroundColor: PropTypes.string,
  enableTextColor: PropTypes.string,
  disableBackgroundColor: PropTypes.string,
  disableTextColor: PropTypes.string,
  onPress: PropTypes.func,
  enable: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  children: 'Okay',
  enableBackgroundColor: colors.buttonBackgroundColor,
  enableTextColor: colors.buttonTitleColor,
  disableBackgroundColor: colors.buttonDisabledBackground,
  disableTextColor: colors.buttonDisableTitleColor,
  onPress: () => {},
  enable: true,
  loading: false,
  style: {},
};
