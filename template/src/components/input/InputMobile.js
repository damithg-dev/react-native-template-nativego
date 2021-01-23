import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import PropTypes from 'prop-types';
import {TextInputMask} from 'react-native-masked-text';
import {InputContainer} from './InputContainer';
import {styles} from './Styles';
import {colors} from '../../styles';

export const InputMobile = forwardRef((props, ref) => {
  let {
    textInputStyle,
    editable,
    underlineColorAndroid,
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
  } = props;

  const [textInputFocus, setTextInputFocus] = useState(false);
  const [showCustomInvalidMessage, setShowCustomInvalidMessage] = useState(
    false,
  );
  const [textMask, setTextMask] = useState('999 999 9999');
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
    if (replacedText[0] == '0') {
      setTextMask('999 999 9999');
    } else {
      setTextMask('99 999 9999');
    }
    let validatedText = replacedText.replace(/[^0-9]/g, '');
    onChangeText(validatedText, rowText);
  };

  renderTextInput = () => {
    return (
      <TextInputMask
        ref={inputRef}
        style={[
          styles.input,
          {
            color: editable === false ? '#000000' : '#2c3e50',
          },
          textInputStyle,
        ]}
        options={{
          mask: textMask,
        }}
        type={'custom'}
        keyboardType={'phone-pad'}
        textContentType={'telephoneNumber'}
        autoCompleteType={'tel'}
        underlineColorAndroid={underlineColorAndroid}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        editable={editable}
        maxLength={maxLength}
        value={value}
        includeRawValueInChangeText={false}
        onChangeText={(text, rowText) =>
          this.onTextChangeCheckTextContainOnlyNumeric(text, rowText)
        }
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => {
          setTextInputFocus(true);
          setShowCustomInvalidMessage(false);
          setInvalidMsg('');
          onFocus();
        }}
        onEndEditing={() => {
          setTextInputFocus(false);
          setShowCustomInvalidMessage(false);
          onEndEditing();
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

InputMobile.propTypes = {
  textInputStyle: PropTypes.object,
  editable: PropTypes.bool,
  underlineColorAndroid: PropTypes.string,
  returnKeyType: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  invalidMessage: PropTypes.string,
  isValid: PropTypes.bool,
  containerStyle: PropTypes.object,
  inputInvalidMessage: PropTypes.string,
  inputIsValid: PropTypes.bool,
  isFocus: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  onPressRight: PropTypes.func,
};

InputMobile.defaultProps = {
  textInputStyle: {},
  editable: true,
  underlineColorAndroid: 'transparent',
  returnKeyType: 'done',
  placeholderTextColor: colors.inputPlaceholderColor,
  placeholder: '',
  value: '',
  maxLength: 50,
  onChangeText: () => {},
  onEndEditing: () => {},
  onFocus: () => {},
  onSubmitEditing: () => {},
  invalidMessage: 'This field is required.',
  isValid: null,
  containerStyle: {},
  inputInvalidMessage: 'This field is required.',
  inputIsValid: null,
  leftIcon: null,
  rightIcon: null,
  label: null,
  labelStyle: {},
  onPressRight: () => {},
};
