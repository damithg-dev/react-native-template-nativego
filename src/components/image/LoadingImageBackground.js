import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { colors } from "../../styles";
import { ImageLoad } from "./ImageLoad";

export const LoadingImageBackground = (props) => {
  const { style, source, resizeMode, children } = props;

  const imageSource = typeof source === "string" ? { uri: source } : source;

  if (props.source == null) {
    return (
      <ImageLoad
        customImagePlaceholderDefaultStyle={{
          overflow: "hidden",
        }}
        backgroundColor={colors.imagePlaceholderColor}
        isShowActivity={false}
        borderRadius={style != null ? style.borderRadius | 0 : 0}
        resizeMode={"contain"}
        style={style}
        source={imageSource}
      >
        {children}
      </ImageLoad>
    );
  }

  return (
    <ImageLoad
      placeholderSource={placeHolder}
      placeholderResizeMode={"scale"}
      customImagePlaceholderDefaultStyle={{
        overflow: "hidden",
      }}
      backgroundColor={colors.imagePlaceholderColor}
      isShowActivity={false}
      style={style}
      resizeMethod={resizeMethod}
      resizeMode={resizeMode}
      borderRadius={style != null ? style.borderRadius | 0 : 0}
      source={imageSource}
    >
      {children}
    </ImageLoad>
  );
};

LoadingImageBackground.prototypes = {
  style: PropTypes.object,
  children: PropTypes.object,
  source: PropTypes.string,
  resizeMode: PropTypes.string,
  resizeMethod: PropTypes.string,
  placeholderType: PropTypes.string,
};

LoadingImageBackground.defaultProps = {
  style: {},
  source: "",
  children: {},
  resizeMode: "cover",
  resizeMethod: "resize",
  placeholderType: "LARGE",
};
