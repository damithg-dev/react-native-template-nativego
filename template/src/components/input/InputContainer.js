import React, {
  forwardRef,
} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './Styles';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const InputContainer = forwardRef((props, ref) => {
  let {
    containerStyle,
    inputInvalidMessage,
    inputIsValid,
    label,
    labelStyle,
    children,
    isFocus,
    leftIcon,
    rightIcon,
    onPressRight,
    onPress
  } = props;

  getBottomColor = () => {
    if (isFocus === true) {
      return colors.inputFocusColor;
    } else if (inputIsValid === false) {
      return colors.inputErrorColor;
    } else if (inputIsValid === true) {
      return colors.inputValidColor;
    } else {
      return colors.inputNormalColor;
    }
  };

  renderErrorMessage = () => {
    if (inputIsValid === false && !isFocus) {
      return (
        <Text style={[styles.errorMessage]}>
          {inputInvalidMessage}
        </Text>
      );
    } else {
      return <Text style={[styles.errorMessage]}> </Text>;
    }
  };

  renderUnderLine = () => {
    const color = getBottomColor();
    return (
      <View
        style={[
          styles.bottomBar,
          {backgroundColor: color},
        ]}
      />
    );
  };

  renderIconOnRight = () => {
    if (rightIcon == null) return;
    return (
      <TouchableOpacity 
        onPress={onPressRight}
        style={styles.rightButton}
        >
        <Icon name={rightIcon} size={15} color={colors.buttonBackgroundColor} />
      </TouchableOpacity>
    );
  };

  renderIconOnLeft = () => {
    if (leftIcon == null) return;
    return (
    <View style={styles.leftButton}>
      <Icon name={leftIcon} size={15} color={colors.buttonBackgroundColor} />
      </View>
    );
  };

  renderLabel = () => {
    if (label == null) return;
    return (
      <Text
        style={[styles.inputLabel, labelStyle]}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        {label}
      </Text>
    );
  };

  return (
    <View>
      <View style={[containerStyle]}>
        {renderLabel()}
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {renderIconOnLeft()}
          <View
            style={[
              styles.inputContainer,
            ]}>
            {children}
          </View>
          {renderIconOnRight()}
        </View>
        {renderUnderLine()}
      </View>
      {renderErrorMessage()}
    </View>
  );
});

InputContainer.propTypes = {
  containerStyle: PropTypes.object,
  inputInvalidMessage: PropTypes.string,
  inputIsValid: PropTypes.bool,
  isFocus:  PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  onPressRight : PropTypes.func,
};

InputContainer.defaultProps = {
  containerStyle: {},
  inputInvalidMessage: 'This field is required.',
  inputIsValid: null,
  leftIcon: null,
  rightIcon: null,
  label: null,
  labelStyle: {},
  onPressRight : () => {},
};
