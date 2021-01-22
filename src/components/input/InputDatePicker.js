import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {dateFormat} from '../../utilities/functions';
import {styles} from './Styles';
import {colors} from '../../styles';
import PropTypes from 'prop-types';
import {InputContainer} from './InputContainer';

export const InputDatePicker = forwardRef((props, ref) => {
  let {
    placeholder,
    value,
    invalidMessage,
    isValid,
    minimumDate,
    maximumDate,
    onChangeTime,
    onHide,
  } = props;

  const [textInputFocus, setTextInputFocus] = useState(false);
  const [showCustomInvalidMessage, setShowCustomInvalidMessage] = useState(
    false,
  );
  const [invalidMsg, setInvalidMsg] = useState('');
  const inputContainerRef = useRef();

  useImperativeHandle(ref, () => ({
    focus() {
      setTextInputFocus(true);
    },
    setInvalidMessage(message) {
      setShowCustomInvalidMessage(true);
      setInvalidMsg(message);
    },
  }));

  renderDatePicker = () => {
    return (
      <DateTimePickerModal
        value={value.length == 0 ? new Date() : value}
        isVisible={textInputFocus}
        mode="date"
        onConfirm={(date) => {
          setTextInputFocus(false);
          onChangeTime(date);
        }}
        onHide={() => {
          onHide();
        }}
        onCancel={() => {
          onHide();
          setTextInputFocus(false);
        }}
      />
    );
  };

  renderDateText = () => {
    return (
      <Text
        style={[
          styles.input,
          {
            color:
              value.length == 0
                ? colors.inputPlaceholderColor
                : colors.titleColor,
          },
        ]}>
        {value.length == 0 ? placeholder : dateFormat(value, 'DD/MM/YYYY')}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setTextInputFocus(true);
      }}>
      <InputContainer
        ref={inputContainerRef}
        isFocus={textInputFocus}
        inputInvalidMessage={
          showCustomInvalidMessage ? invalidMsg : invalidMessage
        }
        inputIsValid={showCustomInvalidMessage ? false : isValid}
        {...props}>
        {renderDateText()}
        {renderDatePicker()}
      </InputContainer>
    </TouchableOpacity>
  );
});

InputDatePicker.propTypes = {
  containerStyle: PropTypes.object,
  invalidMessage: PropTypes.string,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onPressRight: PropTypes.func,
  minimumDate: PropTypes.string,
  maximumDate: PropTypes.string,
  onChangeTime: PropTypes.func,
  onHide: PropTypes.func,
};

InputDatePicker.defaultProps = {
  containerStyle: {},
  invalidMessage: 'This field is required.',
  isValid: null,
  placeholder: 'DD/MM/YYYY',
  value: '',
  label: '',
  labelStyle: {},
  leftIcon: null,
  rightIcon: null,
  onPressRight: () => {},
  minimumDate: null,
  maximumDate: null,
  onChangeTime: () => {},
  onHide: () => {},
};
