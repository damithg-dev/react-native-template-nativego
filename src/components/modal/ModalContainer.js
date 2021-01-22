import React, {useRef, forwardRef, useImperativeHandle, useMemo} from 'react';
import {View} from 'react-native';
import {BottomSheetModal , BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';

export const ModalContainer = forwardRef((props, ref) => {
  const {snapPoints, onDismiss, children} = props;

  const bottomSheetModalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    show() {
      bottomSheetModalRef.current.present();
    },
    close() {
      bottomSheetModalRef.current.close();
    },
  }));


  return (
    <BottomSheetModal
      backdropComponent={BottomSheetBackdrop}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      onDismiss={onDismiss}>
      {children}
    </BottomSheetModal>
  );
});

ModalContainer.propTypes = {
  snapPoints: PropTypes.array,
  onDismiss: PropTypes.func,
  children: PropTypes.element,
};

ModalContainer.defaultProps = {
  snapPoints: ['90%'],
  onDismiss: () => {},
  children: <View style={{height: '50%'}} />,
};
