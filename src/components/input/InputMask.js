import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInputMask} from 'react-native-masked-text';
import {styles} from './Styles';
import {InputContainer} from './InputContainer';
import PropTypes from 'prop-types';
import {colors} from '../../styles';

export const InputMask = forwardRef((props, ref) => {
  let {
    textInputStyle,
    editable,
    underlineColorAndroid,
    textContentType,
    returnKeyType,
    placeholderTextColor,
    placeholder,
    value,
    maxLength,
    onChangeText,
    onEndEditing,
    onFocus,
    onSubmitEditing,
    invalidMessage,
    isValid,
    options,
    includeRawValueInChangeText,
    type,
  } = props;

  const [textInputFocus, setTextInputFocus] = useState(false);
  const [showCustomInvalidMessage, setShowCustomInvalidMessage] = useState(
    false,
  );
  const [invalidMsg, setInvalidMsg] = useState('');
  const inputRef = useRef();
  const inputContainerRef = useRef();

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    setInvalidMessage(message) {
      setShowCustomInvalidMessage(true);
      setInvalidMsg(message);
    },
  }));

  onTextChangeCheckTextContainOnlyNumeric = (text, rowText) => {
    let replacedText = rowText == '0' ? '' : text;
    let validatedText = replacedText.replace(/[^0-9]/g, '');
    onChangeText(validatedText);
  };

  renderTextInput = () => {
    var emptyText = '';
    if (options) {
      emptyText = options.unit + ' 0';
    } else {
      emptyText = '0';
    }

    return (
      <TextInputMask
        ref={inputRef}
        type={type}
        style={[
          styles.input,
          {
            color: editable === false ? '#000000' : '#2c3e50',
          },
          textInputStyle,
        ]}
        underlineColorAndroid={underlineColorAndroid}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        options={options}
        keyboardType={'decimal-pad'}
        textContentType={textContentType}
        editable={editable}
        maxLength={maxLength}
        value={value != null ? (value == emptyText ? '' : value) : ''}
        includeRawValueInChangeText={includeRawValueInChangeText}
        onChangeText={(text, rowText) =>
          onTextChangeCheckTextContainOnlyNumeric(text, rowText)
        }
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onEndEditing={() => {
          setTextInputFocus(false);
          setShowCustomInvalidMessage(false);
          onEndEditing();
        }}
        onFocus={() => {
          setTextInputFocus(true);
          setShowCustomInvalidMessage(false);
          setInvalidMsg('');
          onFocus();
        }}
      />
    );
  };

  return (
    <InputContainer
      ref={inputContainerRef}
      isFocus={textInputFocus}
      inputInvalidMessage={
        showCustomInvalidMessage ? invalidMsg : invalidMessage
      }
      inputIsValid={showCustomInvalidMessage ? false : isValid}
      {...props}>
      {renderTextInput()}
    </InputContainer>
  );
});

InputMask.propTypes = {
  containerStyle: PropTypes.object,
  invalidMessage: PropTypes.string,
  isValid: PropTypes.bool,
  textInputStyle: PropTypes.object,
  editable: PropTypes.bool,
  underlineColorAndroid: PropTypes.string,
  textContentType: PropTypes.string,
  returnKeyType: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onPressRight: PropTypes.func,
  options: PropTypes.object,
  includeRawValueInChangeText: PropTypes.bool,
  type: PropTypes.string,
};

InputMask.defaultProps = {
  containerStyle: {},
  invalidMessage: 'This field is required.',
  isValid: null,
  textInputStyle: {},
  editable: true,
  underlineColorAndroid: 'transparent',
  returnKeyType: 'done',
  placeholderTextColor: colors.inputPlaceholderColor,
  placeholder: '',
  value: '',
  maxLength: 150,
  onChangeText: () => {},
  onEndEditing: () => {},
  onFocus: () => {},
  onSubmitEditing: () => {},
  label: '',
  labelStyle: {},
  leftIcon: null,
  rightIcon: null,
  onPressRight: () => {},
  options: {precision: 0, delimiter: '', separator: '', unit: 'Rs. '},
  includeRawValueInChangeText: true,
  type: 'money',
};
