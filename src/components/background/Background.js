import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {SafeAreaView, View, StyleSheet, ImageBackground} from 'react-native';
import {CustomKeyboardAvoidingView} from './CustomKeyboardAvoidingView';
import {Alert, ConfirmationAlert} from '../alert';
import {LoadingIndicator, Preloader} from '../preloader';
import {colors} from '../../styles/';
import PropTypes from 'prop-types';
import Toast, {DURATION} from 'react-native-easy-toast';

export const Background = forwardRef((props, ref) => {
  const {
    children,
    outerScrollBottom,
    outerScrollHeader,
    color,
    scrollEnabled,
    safeAreaEnabled,
    loading,
    refreshControl,
    source,
  } = props;

  const toastRef = useRef(null);
  const preloaderRef = useRef(null);
  const confirmationAlertRef = useRef(null);
  const alertRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showLoader(isShowProgress = false) {
      preloaderRef.current.show(isShowProgress);
    },
    showAlert(
      title = '',
      message = '',
      buttonText = '',
      onPressed = () => {},
      buttonBackgroundColor = colors.buttonBackgroundColor,
      buttonTextColor = colors.buttonTitleColor,
      closeOnTouchOutside = false,
      closeOnHardwareBackPress = false,
    ) {
      alertRef.current.show(
        title,
        message,
        buttonText,
        onPressed,
        buttonBackgroundColor,
        buttonTextColor,
        closeOnTouchOutside,
        closeOnHardwareBackPress,
      );
    },
    showConfirmationAlert(
      title,
      message,
      cancelText = 'No',
      confirmText = 'Yes',
      cancelAction = () => {},
      confirmAction = () => {},
    ) {
      confirmationAlertRef.current.show(
        title,
        message,
        cancelText,
        confirmText,
        cancelAction,
        confirmAction,
        () => {},
        false,
        false,
      );
    },
    showToast(message) {
      toastRef.current.show(message, 2000);
    },
    progressUpdate(progress) {
      preloaderRef.current.progress(progress);
    },
    hideLoaderWithMessage(message) {
      return new Promise((resolve, reject) =>
        preloaderRef.current
          .closeWithMessage(message)
          .then(() => resolve())
          .catch(() => reject()),
      );
    },
    hideLoader() {
      return new Promise((resolve, reject) =>
        preloaderRef.current
          .close()
          .then(() => {
            resolve();
          })
          .catch(() => reject()),
      );
    },
  }));

  renderLoader = () => {
    return <Preloader ref={preloaderRef} />;
  };

  renderConfirmationAlert = () => {
    return <ConfirmationAlert ref={confirmationAlertRef} />;
  };

  renderAlert = () => {
    return <Alert ref={alertRef} />;
  };

  renderToast = () => {
    return <Toast ref={toastRef} position="bottom" opacity={1} />;
  };

  renderSafeArea = () => {
    if (safeAreaEnabled) {
      return (
        <SafeAreaView style={styles.keyboardAvoidingContainer}>
          {renderKeyboardScrollView()}
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.keyboardAvoidingContainer}>
          {renderKeyboardScrollView()}
        </View>
      );
    }
  };

  renderOuterScrollBottom = () => {
    if (outerScrollBottom != null) {
      return outerScrollBottom;
    }
  };

  renderOuterScrollHeader = () => {
    if (outerScrollHeader != null) {
      return outerScrollHeader;
    }
  };

  renderKeyboardScrollView = () => {
    if (scrollEnabled) {
      return (
        <CustomKeyboardAvoidingView refreshControl={refreshControl}>
          {children}
        </CustomKeyboardAvoidingView>
      );
    } else {
      return <>{children}</>;
    }
  };

  renderContent = () => {
    if (loading == true) {
      return (
        <BaseContainer color={color}>
            {renderOuterScrollHeader()}
            <View style={styles.loadingContainer}>
              <LoadingIndicator />
              {renderConfirmationAlert()}
              {renderToast()}
              {renderAlert()}
            </View>
        </BaseContainer>
      );
    } else {
      return (
        <BaseContainer source={source} color={color}>
            {renderOuterScrollHeader()}
            {renderSafeArea()}
            {renderLoader()}
            {renderConfirmationAlert()}
            {renderAlert()}
            {renderToast()}
            {renderOuterScrollBottom()}
        </BaseContainer>
      );
    }
  };

  return renderContent();
});

Background.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  outerScrollBottom: PropTypes.element,
  outerScrollHeader: PropTypes.element,
  navigationBar: PropTypes.element,
  color: PropTypes.string,
  scrollEnabled: PropTypes.bool,
  safeAreaEnabled: PropTypes.bool,
  loading: PropTypes.bool,
  refreshControl: PropTypes.element,
  isStatusBarHide: PropTypes.bool.isRequired,
  onWillFocus: PropTypes.func,
  onDidFocus: PropTypes.func,
  onWillBlur: PropTypes.func,
  onDidBlur: PropTypes.func,
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      }),
    ),
  ]),
};

Background.defaultProps = {
  children: null,
  outerScrollBottom: null,
  outerScrollHeader: null,
  navigationBar: null,
  color: colors.mainBackgroundColor,
  scrollEnabled: true,
  safeAreaEnabled: true,
  loading: false,
  refreshControl: null,
  isStatusBarHide: false,
  onWillFocus: () => {},
  onDidFocus: () => {},
  onWillBlur: () => {},
  onDidBlur: () => {},
  source: null,
};

const BaseContainer = ({source, color, children}) => {
  if (source == null) {
    return (
      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor: color,
          },
        ]}>
        {children}
      </View>
    );
  } else {
    return (
      <ImageBackground
        source={source}
        style={[
          styles.mainContainer,
          {
            backgroundColor: color,
          },
        ]}>
        {children}
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  keyboardAvoidingContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});
