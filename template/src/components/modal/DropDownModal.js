import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BottomSheetFlatList, TouchableOpacity} from '@gorhom/bottom-sheet';
import {colors} from '../../styles';
import PropTypes from 'prop-types';
import {ModalContainer} from './ModalContainer';
import {DropDownDefault} from '../flatListItem';

export const DropDownModal = forwardRef((props, ref) => {
  const {
    dataSource,
    value,
    title,
    onSelectItem,
    dataKey,
    renderItem,
    onDismiss,
  } = props;

  const modalContainerRef = useRef();

  useImperativeHandle(ref, () => ({
    show() {
      modalContainerRef.current.show();
    },
    close() {
      modalContainerRef.current.close();
    },
  }));

  renderDefaultItem = ({item}) => {
    if (renderItem) {
      return renderItem(item, value );
    } else {
      return (
        <DropDownDefault
          item={item}
          selectedItem={value}
          dataKey={dataKey}
          onPress={() => {
            onSelectItem(item);
            setTimeout(() =>{
              modalContainerRef.current.close();
            }, 500)            
          }}
        />
      );
    }
  };

  renderContent = () => {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <BottomSheetFlatList
          data={dataSource}
          keyExtractor={(item, index) => 'DropDownModal*****1 ' + index}
          renderItem={renderDefaultItem}
        />
      </View>
    );
  };

  return (
    <ModalContainer
      ref={modalContainerRef}
      snapPoints={['50%', '80%']}
      onDismiss={onDismiss}>
      {renderContent()}
    </ModalContainer>
  );
});

DropDownModal.propTypes = {
  dataSource: PropTypes.array,
  value: PropTypes.array,
  title: PropTypes.string,
  onCancelPressed: PropTypes.func,
  onSelectItem: PropTypes.func,
  dataKey: PropTypes.string,
  renderItem: PropTypes.func,
};

DropDownModal.defaultProps = {
  dataSource: [],
  value: {},
  title: '',
  onCancelPressed: () => {},
  onSelectItem: () => {},
  dataKey: '',
  renderItem: null,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    color: colors.titleColor,
    width: '100%',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});
