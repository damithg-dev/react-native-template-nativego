import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import {InputContainer} from './InputContainer'
import { styles } from "./Styles";
import { colors } from "../../styles";

export const Input = forwardRef((props, ref) => {
  let {
    keyboardType,
    textInputStyle,
    editable,
    underlineColorAndroid,
    autoCapitalize,
    textContentType,
    autoCompleteType,
    returnKeyType,
    secureTextEntry,
    placeholderTextColor,
    placeholder,
    value,
    maxLength,
    multiline,
    onChangeText,
    onEndEditing,
    onFocus,
    onSubmitEditing,
    invalidMessage,
    isValid
  } = props;

  const [textInputFocus, setTextInputFocus] = useState(false);
  const [showCustomInvalidMessage, setShowCustomInvalidMessage] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState("");
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

  renderTextInput = () => {
    if (keyboardType == null) {
      return (
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: editable === false ? "#000000" : "#2c3e50",
            },
            textInputStyle,
          ]}
          underlineColorAndroid={underlineColorAndroid}
          autoCapitalize={autoCapitalize}
          textContentType={textContentType}
          autoCompleteType={autoCompleteType}
          editable={editable}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          value={value != null ? `${value}` : ""}
          maxLength={maxLength}
          multiline={multiline}
          onChangeText={onChangeText}
          onEndEditing={() => {
            setTextInputFocus(false);
            setShowCustomInvalidMessage(false);
            onEndEditing();
          }}
          onFocus={() => {
            setTextInputFocus(true);
            setShowCustomInvalidMessage(false);
            setInvalidMsg("");
            onFocus();
          }}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
        />
      );
    } else {
      return (
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: editable === false ? "#000000" : "#2c3e50",
              // backgroundColor:'red'
            },
            textInputStyle,
          ]}
          underlineColorAndroid={underlineColorAndroid}
          autoCapitalize={autoCapitalize}
          textContentType={textContentType}
          autoCompleteType={autoCompleteType}
          editable={editable}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          value={value != null ? `${value}` : ""}
          maxLength={maxLength}
          multiline={multiline}
          onChangeText={onChangeText}
          onEndEditing={() => {
            setTextInputFocus(false);
            setShowCustomInvalidMessage(false);
            onEndEditing();
          }}
          onFocus={() => {
            setTextInputFocus(true);
            setShowCustomInvalidMessage(false);
            setInvalidMsg("");
            onFocus();
          }}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
        />
      );
    }
  };

  return (
    <InputContainer 
      ref={inputContainerRef}
      isFocus = {textInputFocus}
      inputInvalidMessage = {showCustomInvalidMessage ? invalidMsg : invalidMessage}
      inputIsValid = {showCustomInvalidMessage ? false : isValid }
      {...props}
      >
      {renderTextInput()}
    </InputContainer>
  );
});

Input.propTypes = {
  containerStyle: PropTypes.object,
  invalidMessage: PropTypes.string,
  isValid: PropTypes.bool,
  keyboardType: PropTypes.string,
  textInputStyle: PropTypes.object,
  editable: PropTypes.bool,
  underlineColorAndroid: PropTypes.string,
  autoCapitalize: PropTypes.string,
  textContentType: PropTypes.string,
  autoCompleteType: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onPressRight : PropTypes.func,
};

Input.defaultProps = {
  containerStyle: {},
  invalidMessage:  "This field is required.",
  isValid: null,
  keyboardType: 'default',
  textInputStyle: {},
  editable: true,
  underlineColorAndroid: "transparent",
  autoCapitalize: "sentences",
  textContentType: "none",
  autoCompleteType: "off",
  returnKeyType: "done",
  secureTextEntry: false,
  placeholderTextColor: colors.inputPlaceholderColor,
  placeholder: "",
  value: "",
  maxLength: 150,
  multiline: false,
  onChangeText: () => {},
  onEndEditing: () => {},
  onFocus: () => {},
  onSubmitEditing: () => {},
  label: '',
  labelStyle: {},
  leftIcon: null,
  rightIcon: null,
  onPressRight : () => {},
};
