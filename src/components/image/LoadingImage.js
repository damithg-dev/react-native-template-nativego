import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { colors } from "../../styles";
import { ImageLoad } from "./ImageLoad";

export const LoadingImage = (props) => {
  const { source, style, resizeMethod, resizeMode } = props;

  const imageSource = typeof source === "string" ? { uri: source } : source;

  if (source == null) {
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
      />
    );
  }
  return (
    <ImageLoad
      customImagePlaceholderDefaultStyle={{
        overflow: "hidden",
      }}
      backgroundColor={colors.imagePlaceholderColor}
      isShowActivity={false}
      borderRadius={style != null ? style.borderRadius | 0 : 0}
      resizeMethod={resizeMethod}
      resizeMode={resizeMode}
      style={style}
      source={imageSource}
    />
  );
};

LoadingImage.prototypes = {
  style: PropTypes.object,
  source: PropTypes.string,
  resizeMode: PropTypes.string,
  resizeMethod: PropTypes.string,
  placeholderType: PropTypes.string,
};

LoadingImage.defaultProps = {
  style: {},
  source: "",
  resizeMode: "cover",
  resizeMethod: "resize",
  placeholderType: "LARGE",
};
