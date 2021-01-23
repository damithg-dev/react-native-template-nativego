import React from "react";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { colors, fonts } from "../../styles";

export const LoadingIndicatorTypes = {
  custom: "custom",
  activity: "ActivityIndicator",
};

export const LoadingIndicator = (props) => {
  let { color, type, size } = props;
  if(type == LoadingIndicatorTypes.activity){
    return <ActivityIndicator size={size} color={color} />;
  }else{
    return <ActivityIndicator size={size} color={color} />;
  }
  
};

LoadingIndicator.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  type: LoadingIndicatorTypes.main,
  color: colors.loadingIndicatorColor,
  size: "large",
};
