import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const DropDownDefault = ({onPress, item, selectedItem, dataKey}) => {
  let isSelected = selectedItem == item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <Text style={styles.title}>{item[dataKey]}</Text>
      {isSelected ? <Icon name={'check-square'} size={15} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    padding: 12,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 17,
    color: colors.titleColor,
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
});
