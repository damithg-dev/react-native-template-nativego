import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { DropDownModal} from '../modal';
import {InputContainer} from './InputContainer';
import {styles} from './Styles';
import {colors} from '../../styles';
import PropTypes from 'prop-types';

export const InputDropDown = forwardRef((props, ref) => {
  const {
    dataSource,
    value,
    title,
    onSelectItem,
    dataKey,
    onDismiss,
    renderItem,
    invalidMessage,
    isValid,
    placeholder,
  } = props;

  const [textInputFocus, setTextInputFocus] = useState(false);
  const [showCustomInvalidMessage, setShowCustomInvalidMessage] = useState(
    false,
  );
  const [invalidMsg, setInvalidMsg] = useState('');
  const dropDownModelRef = useRef();
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

  renderDropDownModel = () => {
    return (
      <DropDownModal
        ref={dropDownModelRef}
        dataSource={dataSource}
        value={value}
        title={title}
        onSelectItem={onSelectItem}
        dataKey={dataKey}
        onDismiss={() => {
          setTextInputFocus(false);
          onDismiss();
        }}
        renderItem={renderItem}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        dropDownModelRef.current.show();
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
        <Text
          style={[
            styles.input,
            {
              color: value == null ? colors.inputPlaceholderColor : colors.titleColor,
            },
          ]}>
          {value == null ? placeholder : value[dataKey]}
        </Text>
        {renderDropDownModel()}
      </InputContainer>
    </TouchableOpacity>
  );
});



InputDropDown.propTypes = {
  dataSource: PropTypes.array,
  value : PropTypes.object,
  title: PropTypes.string,
  onSelectItem: PropTypes.func,
  dataKey: PropTypes.string,
  onDismiss: PropTypes.func,
  renderItem: PropTypes.func,
  invalidMessage: PropTypes.string,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
  containerStyle: PropTypes.object,
  isFocus:  PropTypes.bool,
  rightIcon: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  onPressRight : PropTypes.func,
};

InputDropDown.defaultProps = {
  dataSource: [],
  value : {},
  title: '',
  onSelectItem: ()=> {},
  dataKey: '',
  onDismiss:  () => {},
  renderItem: null,
  invalidMessage:  'This field is required.',
  isValid: null,
  placeholder: '',
  containerStyle: {},
  leftIcon: null,
  rightIcon: null,
  label: null,
  labelStyle: {},
  onPressRight : () => {},
};