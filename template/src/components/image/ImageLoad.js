import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image, ImageBackground, View } from "react-native";
import { LoadingIndicator } from "../preloader";
import { colors } from "../../styles";

export const ImageLoad = (props) => {
  const {
    style,
    source,
    resizeMode,
    borderRadius,
    backgroundColor,
    children,
    placeholderSource,
    placeholderStyle,
    customImagePlaceholderDefaultStyle,
  } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
  }, []);

  onLoadEnd = () => {
    setIsLoaded(true);
  };

  onError = () => {
    setIsError(true);
  };

  return (
    <ImageBackground
      onLoadEnd={onLoadEnd}
      onError={onError}
      style={[styles.backgroundImage, style]}
      source={source}
      resizeMode={resizeMode}
      borderRadius={borderRadius}
    >
      {isLoaded && !isError ? (
        children
      ) : (
        <View
          style={[
            styles.viewImageStyles,
            { borderRadius: borderRadius },
            backgroundColor ? { backgroundColor: backgroundColor } : {},
          ]}
        >
          {isShowActivity && !isError && <LoadingIndicator />}
          <Image
            resizeMode={"contain"}
            style={
              placeholderStyle
                ? placeholderStyle
                : [
                    styles.imagePlaceholderStyles,
                    customImagePlaceholderDefaultStyle,
                  ]
            }
            source={placeholderSource}
          />
        </View>
      )}
      {children && <View style={styles.viewChildrenStyles}>{children}</View>}
    </ImageBackground>
  );
};

ImageLoad.prototypes = {
  isShowActivity: PropTypes.bool,
};

ImageLoad.defaultProps = {
  isShowActivity: true,
};

const styles = {
  backgroundImage: {
    position: "relative",
  },
  activityIndicator: {
    position: "absolute",
    margin: "auto",
    zIndex: 9,
  },
  viewImageStyles: {
    flex: 1,
    backgroundColor: colors.imagePlaceholderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderStyles: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "90%",
    height: "90%",
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    backgroundColor: "transparent",
  },
};
