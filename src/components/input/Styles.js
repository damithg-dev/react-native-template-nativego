import React from 'react';
import {StyleSheet} from 'react-native';
import {colors , fonts} from '../../styles'


export const styles = StyleSheet.create({
  input: {
    color: colors.titleColor,
    fontSize: 15,
    textAlignVertical: "center",
    width:'100%',
  },
  inputContainer: {
    alignItems: "center",
    alignContent: 'center',
    backgroundColor: colors.inputBackgroundColor,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
    width:'90%'
  },
  rightButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '10%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  leftButton: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  errorMessage: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 14,
    color: colors.inputErrorColor,
  },
  bottomBar: {
    width: "100%",
    height: 1,
  },
  inputLabel: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 16,
    color: colors.titleColor,
    lineHeight: 24,
  },
});
